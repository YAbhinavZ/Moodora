import { useNavigate } from "react-router-dom";
import MoodInput from "../components/MoodInput";

const Home = () => {
  const navigate = useNavigate();

  const handleResult = (data) => {
    navigate("/dashboard", {
      state: { moodData: data },
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-950 to-gray-900">

      {/* Background Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

      {/* Floating Music Icons */}
      <div className="absolute top-24 left-16 text-6xl opacity-10 animate-bounce">
        🎵
      </div>

      <div className="absolute bottom-24 right-20 text-7xl opacity-10 animate-pulse">
        🎧
      </div>

      <div className="absolute top-52 right-44 text-5xl opacity-10 animate-bounce">
        🎶
      </div>

      <div className="absolute bottom-48 left-36 text-5xl opacity-10 animate-pulse">
        🎼
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5">

        {/* AI Badge */}
        <div className="mb-8 px-5 py-2 rounded-full border border-purple-500/30 bg-white/5 backdrop-blur-md text-sm text-purple-300 font-medium shadow-lg">
          ✨ Powered by Gemini AI
        </div>

        {/* Heading */}
        <h1 className="text-center text-5xl md:text-7xl font-extrabold leading-tight text-white">
          Your Mood.
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Your Playlist.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-center text-lg md:text-xl text-gray-400 leading-relaxed">
          Describe how you're feeling and let AI understand your emotions to
          generate a personalized playlist that perfectly matches your mood.
        </p>

        {/* Mood Input Card */}
        <div className="mt-14 w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
          <MoodInput onResult={handleResult} />
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 mt-16 md:grid-cols-3 w-full max-w-6xl">

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition duration-300 hover:scale-105 hover:border-purple-500/40 hover:bg-white/10">
            <div className="text-5xl mb-4">🧠</div>

            <h3 className="text-xl font-bold text-white">
              AI Mood Analysis
            </h3>

            <p className="mt-3 text-gray-400">
              Gemini AI understands your emotions from natural language and
              classifies your mood intelligently.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition duration-300 hover:scale-105 hover:border-pink-500/40 hover:bg-white/10">
            <div className="text-5xl mb-4">🎵</div>

            <h3 className="text-xl font-bold text-white">
              Smart Playlist
            </h3>

            <p className="mt-3 text-gray-400">
              Instantly receive curated songs that perfectly match your current
              mood and emotional state.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition duration-300 hover:scale-105 hover:border-cyan-500/40 hover:bg-white/10">
            <div className="text-5xl mb-4">▶️</div>

            <h3 className="text-xl font-bold text-white">
              Play Instantly
            </h3>

            <p className="mt-3 text-gray-400">
              Watch songs directly from YouTube without leaving the application
              for a seamless listening experience.
            </p>
          </div>

        </div>

        {/* Footer */}
        <p className="mt-16 text-gray-500 text-sm text-center">
          🎧 Moodora • AI Powered Mood Based Playlist Generator
        </p>

      </div>
    </div>
  );
};

export default Home;