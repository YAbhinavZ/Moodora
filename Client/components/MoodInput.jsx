import { useState } from "react";
import { analyseMood } from "../api/mood.api";

// Accepts onResult prop — calls it with the mood data when Gemini responds

const MoodInput = ({ onResult }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await analyseMood(text);
      onResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling right now? Describe your mood..."
        rows={4}
        disabled={loading}
        className="w-full bg-gray-800 text-white rounded-xl p-4 resize-none outline-none border border-gray-700 focus:border-purple-500 transition placeholder-gray-500"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition"
      >
        {loading ? "Reading your vibe..." : "Generate Playlist 🎵"}
      </button>
    </div>
  );
};

export default MoodInput;