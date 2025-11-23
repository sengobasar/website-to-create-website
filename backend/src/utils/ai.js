import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Groq client using API key from environment
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateWebsite(data) {
  const { type, description, theme } = data;

  // Build prompt from type, description, and theme
  const prompt = `You are an expert AI web developer. Generate a complete ${type} website.

Requirements:
- Type: ${type}
- Description: ${description}
- Theme: ${theme}

Generate a full website with:
- Complete layout structure
- All section content
- Tailwind CSS classes for styling
- HTML or JSX template

Return ONLY the HTML/JSX code wrapped in a single div element. Do not include any explanations, markdown formatting, or additional text. Just the complete website code.`;

  // Call Groq model - using llama-3.1-70b-versatile (replacement for decommissioned models)
  // Can be overridden with GROQ_MODEL environment variable
  // Supported models: llama-3.1-8b-instant, llama-3.1-70b-versatile, mixtral-8x7b-32768
  const model = process.env.GROQ_MODEL || 'llama-3.1-70b-versatile';
  
  // Force use of supported model (ignore any decommissioned models in env)
  const supportedModel = 'llama-3.1-70b-versatile';
  console.log(`Using Groq model: ${supportedModel}`);
  
  const response = await groq.chat.completions.create({
    model: supportedModel,
    messages: [
      { role: 'user', content: prompt }
    ]
  });

  return response.choices[0].message.content;
}
