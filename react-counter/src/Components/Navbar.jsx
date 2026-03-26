import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ token, role, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* 🔹 Logo */}
      <div className="navbar-logo">
        <Link to="/">MERN + JWT</Link>
      </div>

      {/* 🔹 Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {/* 🔥 Dashboard Link */}
            <Link to="/dashboard">Dashboard</Link>

            {/* 🔥 Role Badge */}
            <span className="role-badge">
              {role === "admin" ? "Admin 👑" : "User 👤"}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;