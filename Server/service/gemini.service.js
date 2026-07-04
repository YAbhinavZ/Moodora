import axios from "axios";

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

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    }
  );

  const text = response.data.candidates[0].content.parts[0].text;
  const cleaned = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return parsed;
};

export default getMoodAndSongs;