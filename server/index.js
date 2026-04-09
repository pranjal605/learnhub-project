import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/ai.js';
import executeRoutes from './routes/execute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from the deployed Vercel frontend and local dev
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL, // Set this on Render to your Vercel URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman)
        if (!origin) return callback(null, true);
        
        const isLocalhost = origin.startsWith('http://localhost:');
        if (allowedOrigins.includes(origin) || isLocalhost) {
            return callback(null, true);
        }
        callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    },
    credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/career', aiRoutes);
app.use('/api/execute', executeRoutes);

// Health Check (also used as keep-alive ping)
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`🚀 LearnHub Backend running on port ${PORT}`);
});
