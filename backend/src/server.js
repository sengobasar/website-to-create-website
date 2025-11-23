import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRoute from './routes/generate.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// GET /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Mount the generate route at /api/generate
app.use('/api/generate', generateRoute);

// GET handler for /api/generate (helpful error message)
app.get('/api/generate', (req, res) => {
  res.status(405).json({ 
    success: false, 
    error: 'Use POST method instead. Send JSON body with: { "type": "...", "description": "...", "theme": "..." }' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
