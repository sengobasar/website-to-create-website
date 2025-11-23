import { generateWebsite } from '../utils/ai.js';

export async function generate(req, res) {
  try {
    const website = await generateWebsite(req.body);
    return res.json({ success: true, website });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
}
