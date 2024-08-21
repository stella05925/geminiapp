const PORT = 3000;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

app.post('/gemini', async (req, res) => {
    console.log('Received request at /gemini');
    console.log('Request body:', req.body);

    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    console.log('History:', req.body.history);

    const chat = model.startChat({
        history: req.body.history
    });
    

    const msg = req.body.message;

    console.log('Message to send:', msg);

    try {
        const result = await model.generateContent(msg);
        const response = await result.response;
        const text = response.text();
        console.log('Response from model:', text);
        res.send(text);
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
