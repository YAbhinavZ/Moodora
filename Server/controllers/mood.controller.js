import getMoodAndSongs from "../service/gemini.service.js";
import fetchVideoIds from "../service/youtube.service.js";

// ─── Analyse Mood ────────────────────────────────────────────────────────────
// POST /api/mood/analyse
// body: { text }
// protected: yes (requires JWT)

export const analyseMood = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Please describe your mood" });
    }

    // Step 1: Send mood text to Gemini → get mood label + song list
    const { moodLabel, energy, songs } = await getMoodAndSongs(text);

    // Step 2: Fetch a YouTube videoId for each song
    const songsWithVideos = await fetchVideoIds(songs);

    // Step 3: Send everything back to the frontend
    res.status(200).json({
      moodText: text,
      moodLabel,
      energy,
      songs: songsWithVideos,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};