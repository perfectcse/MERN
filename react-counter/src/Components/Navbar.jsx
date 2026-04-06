import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

function Navbar({ token, role, onLogout }) {
  const navigate = useNavigate();

  // Initialize state from localStorage (Correct way)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  // Apply dark mode class when state changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">MERN STACK</Link>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>

            {/* Dark Mode Toggle */}
            <button className="dark-btn" onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* Role Badge */}
            <span className="role-badge">
              {role === "admin" ? "Admin 👑" : "User 👤"}
            </span>

            {/* Logout */}
            <button className="logout-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;