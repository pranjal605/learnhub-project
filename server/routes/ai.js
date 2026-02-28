import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE');

router.post('/roadmap', upload.single('resume'), async (req, res) => {
    try {
        const { role } = req.body;
        const file = req.file;

        if (!role || !file) {
            return res.status(400).json({ error: 'Missing role or resume file' });
        }

        // 1. Extract text from PDF
        const data = await pdfParse(file.buffer);
        const resumeText = data.text;

        // 2. Define the Prompt
        const prompt = `
            You are an expert career counselor. Analyze the following resume text and provide a personalized roadmap to become a ${role}.
            Resume Text:
            ${resumeText}

            Please provide the response in a VALID JSON format strictly following this structure:
            {
                "role": "${role}",
                "roadmap": ["Step 1...", "Step 2...", "Step 3...", "Step 4...", "Step 5...", "Step 6..."],
                "missingSkills": ["Skill 1", "Skill 2", "Skill 3"]
            }
            Ensure the roadmap has exactly 6 steps. Only return the JSON object.
        `;

        // 3. Generate AI Content using the confirmed working model
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        console.log(`Generating roadmap for ${role} using gemini-flash-latest...`);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // 4. Parse AI Response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Failed to generate valid JSON from AI");
        }
        const analysisResult = JSON.parse(jsonMatch[0]);
        res.json(analysisResult);

    } catch (error) {
        console.error('--- AI Processing Error ---');
        console.error('Message:', error.message);

        let clientMessage = error.message;
        if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('limit')) {
            clientMessage = "Your Google AI Key has 0 quota. This means you might be in an unsupported region for the free tier, or you need to enable the 'Generative Language API' in Google Cloud Console. Try a different Google account to generate a new key if this keeps happening.";
        }

        res.status(500).json({
            error: 'Failed to process AI request',
            details: clientMessage
        });
    }
});

export default router;
