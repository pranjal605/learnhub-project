import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini
const API_KEY = process.env.GEMINI_API_KEY;
const isPlaceholderKey = !API_KEY || API_KEY === 'YOUR_API_KEY_HERE';
const genAI = new GoogleGenerativeAI(isPlaceholderKey ? 'DUMMY_KEY' : API_KEY);

router.post('/roadmap', upload.single('resume'), async (req, res) => {
        try {
                    const { role } = req.body;
                    const file = req.file;

            if (!role || !file) {
                            return res.status(400).json({ error: 'Missing role or resume file' });
            }

            // 1. Extract text from PDF
            console.log(`Starting PDF extraction for resume...`);
                    const data = await pdfParse(file.buffer);
                    const resumeText = data.text;
                    console.log(`Successfully extracted ${resumeText.length} characters from resume.`);

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

            // 3. Generate AI Content
            if (isPlaceholderKey) {
                            throw new Error("GEMINI_API_KEY is missing or invalid. Please set a valid API key in your environment variables.");
            }

            const model = genAI.getGenerativeModel({ 
                                                               model: "gemini-1.5-flash",
                            generationConfig: { responseMimeType: "application/json" }
            });

            console.log(`Generating roadmap for ${role} using gemini-1.5-flash...`);
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    const text = response.text();
                    console.log("AI Response received successfully.");

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
