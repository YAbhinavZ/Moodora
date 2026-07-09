import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaylists, deletePlaylist } from "../api/playlist.api";

const History = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists();
        setPlaylists(data);
      } catch (err) {
        console.error("Failed to fetch playlists", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePlaylist(id);
      setPlaylists((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete playlist", err);
    }
  };

  const handlePlayAgain = (playlist) => {
    // Pass saved playlist to Dashboard without re-calling Gemini
    navigate("/dashboard", {
      state: {
        moodData: {
          moodText: playlist.moodText,
          moodLabel: playlist.moodLabel,
          energy: playlist.energy,
          songs: playlist.songs,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading your history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Your Mood History</h1>
        <p className="text-gray-400 text-sm mb-8">All your past playlists</p>

        {playlists.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No playlists saved yet</p>
            <button
              onClick={() => navigate("/")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition"
            >
              Generate your first playlist
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">
                      {new Date(playlist.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-white font-medium">"{playlist.moodText}"</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-purple-800 text-purple-200 text-xs px-3 py-1 rounded-full capitalize">
                        {playlist.moodLabel}
                      </span>
                      <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full capitalize">
                        ⚡ {playlist.energy}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handlePlayAgain(playlist)}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5 rounded-lg transition"
                    >
                      ▶ Play Again
                    </button>
                    <button
                      onClick={() => handleDelete(playlist._id)}
                      className="bg-gray-700 hover:bg-red-800 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Songs preview */}
                <div className="flex flex-col gap-2">
                  {playlist.songs.slice(0, 3).map((song, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {song.thumbnail && (
                        <img
                          src={song.thumbnail}
                          alt={song.title}
                          className="w-8 h-8 rounded object-cover"
                        />
                      )}
                      <p className="text-gray-400 text-sm truncate">
                        {song.title} — {song.artist}
                      </p>
                    </div>
                  ))}
                  {playlist.songs.length > 3 && (
                    <p className="text-gray-600 text-xs mt-1">
                      +{playlist.songs.length - 3} more songs
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;