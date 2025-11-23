import { generateWebsite } from '../utils/ai.js';

export async function generate(req, res) {
  try {
    const aiResponse = await generateWebsite(req.body);
    
    // Clean the AI response by removing markdown code fences
    let html = aiResponse;
    
    // Remove markdown code fences (```jsx, ```html, ```)
    html = html.replace(/```jsx|```html|```/g, '').trim();
    
    // Remove any leading/trailing whitespace and newlines
    html = html.trim();
    
    // Ensure the final value contains ONLY pure HTML
    // Remove any remaining markdown artifacts
    html = html.replace(/^```[\w]*\n?/gm, '').replace(/```$/gm, '').trim();
    
    return res.json({ success: true, website: html });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
}
