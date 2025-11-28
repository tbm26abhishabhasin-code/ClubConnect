import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const generateEventDescription = async (title: string, tags: string[], location: string): Promise<string> => {
  const client = getAI();
  if (!client) {
    console.warn("Gemini API Key missing");
    return "Join us for an amazing event! (AI generation unavailable - API Key missing)";
  }

  try {
    const prompt = `Write a short, exciting, high-energy event description (max 50 words) for an event titled "${title}". 
    Tags: ${tags.join(", ")}. Location: ${location}. 
    Tone: Exclusive, premium, inviting.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Join us for an unforgettable experience.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Join us for an unforgettable experience.";
  }
};

export const generateClubMission = async (name: string, category: string): Promise<string> => {
    const client = getAI();
    if (!client) return "A community for like-minded individuals.";

    try {
        const prompt = `Write a one-sentence, punchy, inspiring mission statement for a club named "${name}" in the category "${category}".`;
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Connect, Share, Grow.";
    } catch (e) {
        return "Connect, Share, Grow.";
    }
}
