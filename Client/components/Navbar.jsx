import { NavLink, useNavigate } from "react-router-dom";
import { Home, History, LogOut, UserCircle2, Music2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between px-8 py-4">

        {/* Left */}
        <div className="flex items-center gap-10">

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <Music2 size={24} className="text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                Moodora
              </h1>
              <p className="text-sm text-gray-400">
                AI Mood Playlist Generator
              </p>
            </div>
          </div>

          <NavLink to="/" className={navStyle}>
            <Home size={18} />
            Home
          </NavLink>

        </div>

        {/* Right */}
        <div className="flex items-center gap-6">

          <NavLink to="/history" className={navStyle}>
            <History size={18} />
            History
          </NavLink>

          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2 border border-white/10">

            <UserCircle2
              size={38}
              className="text-purple-400"
            />

            <div>
              <p className="text-xs text-gray-400">
                Welcome
              </p>

              <p className="font-semibold text-white">
                {user?.name || "User"}
              </p>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;