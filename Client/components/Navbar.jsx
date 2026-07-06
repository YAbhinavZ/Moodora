import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-purple-400">
        🎵 Moodora
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/" className="hover:text-purple-400 transition">
              Home
            </Link>
            <Link to="/history" className="hover:text-purple-400 transition">
              History
            </Link>
            <button
              onClick={handleLogout}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-1.5 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-purple-400 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 px-4 py-1.5 rounded-lg text-sm transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;