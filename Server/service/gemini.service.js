import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ─── Analyse mood + generate songs in one prompt ──────────────────────────
// Returns: { moodLabel, energy, songs: [{ title, artist, reason }] }

const getMoodAndSongs = async (moodText) => {
  const prompt = `
    A user described their mood as: "${moodText}"

    Based on this, respond ONLY with a valid JSON object in this exact format, no extra text:
    {
      "moodLabel": "one word mood label e.g. happy, anxious, calm, sad, excited",
      "energy": "low or mid or high",
      "songs": [
        {
          "title": "song title",
          "artist": "artist name",
          "reason": "one short sentence why this song fits the mood"
        }
      ]
    }

    Generate exactly 8 songs that match the mood. Only return the JSON, nothing else.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Gemini sometimes wraps the JSON in markdown code blocks, strip them
  const cleaned = text.replace(/```json|```/g, "").trim();

  const parsed = JSON.parse(cleaned);

  return parsed;
};

export default getMoodAndSongs;