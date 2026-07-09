import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SongCard from "../Components/SongCard.jsx";
import YouTubePlayer from "../Components/YoutubePlayer.jsx";
import MoodBadge from "../components/MoodBadge.jsx";
import { savePlaylist, rateSong } from "../api/playlist.api";

// Background colors based on mood
const moodBg = {
  happy: "from-yellow-950 to-gray-950",
  excited: "from-orange-950 to-gray-950",
  calm: "from-blue-950 to-gray-950",
  sad: "from-indigo-950 to-gray-950",
  anxious: "from-purple-950 to-gray-950",
  angry: "from-red-950 to-gray-950",
  melancholic: "from-violet-950 to-gray-950",
  default: "from-gray-900 to-gray-950",
};

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const moodData = location.state?.moodData;

  const [songs, setSongs] = useState(moodData?.songs || []);
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [savedPlaylistId, setSavedPlaylistId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Redirect home if no mood data
  useEffect(() => {
    if (!moodData) navigate("/");
  }, [moodData, navigate]);

  if (!moodData) return null;

  const activeSong = songs[activeSongIndex];
  const bgGradient = moodBg[moodData.moodLabel?.toLowerCase()] || moodBg.default;

  // Save playlist to MongoDB
  const handleSave = async () => {
    if (saved) return;
    setSaving(true);
    try {
      const playlist = await savePlaylist({
        moodText: moodData.moodText,
        moodLabel: moodData.moodLabel,
        energy: moodData.energy,
        songs,
      });
      setSavedPlaylistId(playlist._id);
      setSaved(true);
    } catch (err) {
      console.error("Failed to save playlist", err);
    } finally {
      setSaving(false);
    }
  };

  // Rate a song
  const handleRate = async (songId, rating) => {
    // Update UI immediately
    setSongs((prev) =>
      prev.map((s) => (s._id === songId ? { ...s, rating } : s))
    );

    // Save to DB if playlist is already saved
    if (savedPlaylistId) {
      try {
        await rateSong(savedPlaylistId, songId, rating);
      } catch (err) {
        console.error("Failed to rate song", err);
      }
    }
  };

  return (
    <div className={`min-h-screen bg-linear-to-b ${bgGradient} px-4 py-8`}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-2">"{moodData.moodText}"</p>
            <MoodBadge moodLabel={moodData.moodLabel} energy={moodData.energy} />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              {saved ? "✅ Saved" : saving ? "Saving..." : "Save Playlist"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              New Mood
            </button>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: YouTube Player */}
          <div className="sticky top-6">
            <YouTubePlayer
              videoId={activeSong?.videoId}
              title={activeSong ? `${activeSong.title} — ${activeSong.artist}` : ""}
              onPrev={() => setActiveSongIndex((i) => i - 1)}
              onNext={() => setActiveSongIndex((i) => i + 1)}
              hasPrev={activeSongIndex > 0}
              hasNext={activeSongIndex < songs.length - 1}
            />
          </div>

          {/* Right: Song list */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[80vh] pr-1">
            {songs.map((song, index) => (
              <SongCard
                key={song.videoId || index}
                song={song}
                isActive={index === activeSongIndex}
                onClick={() => setActiveSongIndex(index)}
                onRate={handleRate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;