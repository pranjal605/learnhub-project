import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
    const { script, language, versionIndex, stdin } = req.body;

    const clientId = process.env.JDOODLE_CLIENT_ID;
    const clientSecret = process.env.JDOODLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return res.status(500).json({ error: 'Server configuration error: JDoodle credentials missing' });
    }

    try {
        const response = await axios.post('https://api.jdoodle.com/v1/execute', {
            clientId,
            clientSecret,
            script,
            language,
            versionIndex,
            stdin
        });

        res.json(response.data);
    } catch (error) {
        console.error('JDoodle Proxy Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to execute code via JDoodle',
            details: error.response?.data || error.message
        });
    }
});

export default router;
