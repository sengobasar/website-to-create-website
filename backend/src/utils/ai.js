import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Groq client using API key from environment
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateWebsite(data) {
  const { type, description, theme } = data;

  // Build prompt from type, description, and theme
  const prompt = `You are an expert AI website generator. Create a stunning, modern, premium-quality website that rivals Webflow and Framer designs.

Website Details:
- Type: ${type}
- Description: ${description}
- Theme: ${theme}

CRITICAL OUTPUT RULES:
- NEVER return markdown
- NEVER return JSX
- ONLY pure HTML + Tailwind classes
- No backticks
- No code fences (triple backticks with html or jsx)
- Return ONLY raw HTML code, nothing else

REQUIRED HTML STRUCTURE:
You MUST return a complete HTML document with this exact structure:
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>${type} - ${description}</title>
</head>
<body>
  <!-- Your complete website here -->
</body>
</html>

DESIGN REQUIREMENTS - CREATE VISUALLY AMAZING UI:

1. HERO SECTION:
   - Gradient background (use theme colors: ${theme})
   - HUGE typography: text-6xl or text-7xl for main heading
   - text-2xl or text-3xl for subheading
   - Large CTA buttons: px-8 py-4, rounded-full, bg-gradient-to-r
   - Hover effects: hover:scale-105, transition-transform duration-300
   - Add subtle animations: animate-fade-in or opacity transitions
   - Use spacing: py-32 or py-40 for hero height

2. NAVIGATION BAR:
   - Fixed or sticky: fixed top-0 z-50
   - Glassmorphism effect: backdrop-blur-lg bg-white/80 or bg-black/20
   - Smooth transitions on hover
   - Logo/name on left, nav links center/right
   - CTA button on right

3. FEATURE SECTIONS:
   - Grid layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
   - Cards with: rounded-2xl, shadow-xl, p-8
   - Hover effects: hover:shadow-2xl, hover:-translate-y-2, transition-all duration-300
   - Icons (use emoji or SVG icons)
   - Gradient borders or backgrounds
   - Use spacing: py-20, px-6, max-w-7xl mx-auto

4. PRICING SECTION:
   - Cards with gradients: bg-gradient-to-br from-purple-500 to-blue-600
   - Large pricing text: text-5xl font-bold
   - Feature lists with checkmarks
   - Hover scale effect: hover:scale-105
   - Shadow effects: shadow-2xl
   - Border radius: rounded-3xl
   - Padding: p-10

5. TESTIMONIALS:
   - Use Unsplash images: https://images.unsplash.com/photo-[id]?w=400
   - Circular avatars: rounded-full
   - Cards with quotes
   - Star ratings (use ★ or emoji)
   - Gradient backgrounds

6. CTA SECTIONS:
   - Full-width sections with gradient backgrounds
   - Large buttons: text-xl px-10 py-5 rounded-full
   - Hover animations: hover:scale-110, transform transition
   - Contrasting colors

7. FOOTER:
   - Dark background: bg-gray-900 or bg-gradient-to-br
   - Grid layout for links
   - Social media icons
   - Copyright text
   - Padding: py-16

VISUAL ENHANCEMENTS REQUIRED:
- Use gradients everywhere: bg-gradient-to-r, bg-gradient-to-br
- Apply shadows: shadow-lg, shadow-xl, shadow-2xl
- Rounded corners: rounded-xl, rounded-2xl, rounded-3xl, rounded-full
- Spacing: Use py-20, px-10, max-w-7xl, mx-auto consistently
- Typography: Large, bold headings (text-4xl, text-5xl, text-6xl)
- Colors: Use theme colors (${theme}) throughout
- Images: Always use Unsplash: https://images.unsplash.com/photo-[random]?w=800&h=600&fit=crop
- Animations: Add transition-all, duration-300, ease-in-out
- Hover states: hover:scale-105, hover:shadow-2xl, hover:opacity-80

LAYOUT REQUIREMENTS:
- Responsive: Use md:, lg:, xl: breakpoints
- Grid layouts: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Flex layouts: flex flex-col md:flex-row
- Container: max-w-7xl mx-auto px-6
- Sections: Each section with py-20 or py-32

CONTENT REQUIREMENTS:
- Every section must be fully styled - NO plain text
- Use rich, descriptive content
- Add icons, images, and visual elements
- Make it feel premium and professional
- Create depth with shadows and gradients

FINAL OUTPUT:
Return ONLY the complete HTML code. No explanations, no markdown, no backticks, no code fences. Just pure HTML that can be directly rendered in a browser.`;

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
