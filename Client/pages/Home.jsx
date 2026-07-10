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

      {/* Background Glow */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[150px]" />

      {/* Floating Icons */}
      <div className="absolute top-28 left-16 text-6xl opacity-10 animate-bounce">
        🎵
      </div>

      <div className="absolute top-44 right-24 text-5xl opacity-10 animate-pulse">
        🎶
      </div>

      <div className="absolute bottom-32 left-20 text-5xl opacity-10 animate-pulse">
        🎼
      </div>

      <div className="absolute bottom-20 right-20 text-7xl opacity-10 animate-bounce">
        🎧
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-36 pb-12">

        {/* AI Badge */}
        <div className="mb-8 rounded-full border border-purple-500/30 bg-white/5 px-5 py-2 text-sm font-medium text-purple-300 backdrop-blur-md">
          ✨ Powered by Gemini AI
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-center text-5xl font-extrabold leading-tight text-white md:text-7xl">
          Your Mood.
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Your Playlist.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-3xl text-center text-lg leading-relaxed text-gray-400 md:text-xl">
          Describe how you're feeling and let AI understand your emotions to
          generate a personalized playlist that perfectly matches your mood.
        </p>

        {/* Mood Input */}
        <div className="mt-14 w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <MoodInput onResult={handleResult} />
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid w-full max-w-6xl gap-8 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-white/10">
            <div className="mb-4 text-5xl">🧠</div>
            <h3 className="text-xl font-bold text-white">
              AI Mood Analysis
            </h3>
            <p className="mt-3 text-gray-400">
              Gemini AI understands your emotions from natural language and
              classifies your mood intelligently.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/40 hover:bg-white/10">
            <div className="mb-4 text-5xl">🎵</div>
            <h3 className="text-xl font-bold text-white">
              Smart Playlist
            </h3>
            <p className="mt-3 text-gray-400">
              Instantly receive curated songs that perfectly match your current
              mood and emotional state.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 hover:bg-white/10">
            <div className="mb-4 text-5xl">▶️</div>
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
        <p className="mt-16 text-center text-sm text-gray-500">
          🎧 Moodora • AI Powered Mood Based Playlist Generator
        </p>

      </div>
    </div>
  );
};

export default Home;