import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY); // Ensure your .env file has the correct key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Endpoint to generate content
app.post('/generate', async (req, res) => {
  console.log('Received request to /generate');
  
  const { prompt } = req.body;
  console.log('Prompt received:', prompt);

  if (!prompt) {
    console.log('Prompt is missing in the request');
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    console.log('Generating content using Gemini model...');
    const result = await model.generateContent(prompt);
    console.log('Generated response:', result);
    
    // Ensure result.response.text() is called properly
    const responseText = result.response.text();
    res.json({ response: responseText });
    console.log('Response sent to client:', responseText);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5003; // Use environment variable or default to 5003
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
