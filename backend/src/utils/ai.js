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
- Pure HTML template (NO JSX)

CRITICAL: Always return clean HTML only. Never wrap it in markdown or code fences. Do NOT use \`\`\`html, \`\`\`jsx, or any markdown code blocks. Return ONLY the raw HTML code wrapped in a single div element. Do not include any explanations, markdown formatting, or additional text. Just the complete HTML code.`;

  // Call Groq model - try multiple supported models as fallback
  // Can be overridden with GROQ_MODEL environment variable
  // Supported models to try: llama-3.3-70b-versatile, llama-3.1-8b-instant, mixtral-8x7b-32768
  const preferredModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  
  // List of models to try (in order of preference)
  const modelsToTry = [
    preferredModel,
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
    'mixtral-8x7b-32768'
  ].filter((model, index, self) => self.indexOf(model) === index); // Remove duplicates
  
  let lastError = null;
  
  for (const model of modelsToTry) {
    try {
      console.log(`Attempting Groq model: ${model}`);
      const response = await groq.chat.completions.create({
        model: model,
        messages: [
          { role: 'user', content: prompt }
        ]
      });
      
      console.log(`Successfully using model: ${model}`);
      return response.choices[0].message.content;
    } catch (err) {
      const errorMsg = err?.message || String(err) || '';
      if (errorMsg.includes('model_decommissioned') || errorMsg.includes('model_not_found')) {
        console.warn(`Model ${model} not available: ${errorMsg}. Trying next model...`);
        lastError = err;
        continue;
      }
      // For other errors, throw immediately
      throw err;
    }
  }
  
  // If all models failed
  throw new Error(`All models failed. Last error: ${lastError?.message || 'Unknown error'}. Please check Groq documentation for available models.`);
}
