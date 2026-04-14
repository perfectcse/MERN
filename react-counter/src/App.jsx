import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import Bookmarks from "./pages/Bookmarks";
import LikedPosts from "./pages/LikedPosts";

import Navbar from "./Components/Navbar";

import { isTokenExpired } from "./utils/auth";

import "./styles/global.css";

function App() {
  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  // ✅ Validate token once
  const isValidToken =
    storedToken && !isTokenExpired(storedToken);

  const [token, setToken] = useState(
    isValidToken ? storedToken : null
  );

  const [role, setRole] = useState(
    isValidToken ? storedRole : null
  );

  // ✅ Auto remove expired token
  if (storedToken && isTokenExpired(storedToken)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <div className="app-container">
      {/* 🔥 Toast Global Setup */}
      <Toaster position="top-right" reverseOrder={false} />

      <Navbar token={token} role={role} onLogout={handleLogout} />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            token ? (
              <Home token={token} role={role} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            token ? <Profile token={token} /> : <Navigate to="/login" />
          }
        />

        {/* BOOKMARKS */}
        <Route
          path="/bookmarks"
          element={
            token ? <Bookmarks token={token} /> : <Navigate to="/login" />
          }
        />

        {/* LIKED POSTS */}
        <Route
          path="/liked-posts"
          element={
            token ? <LikedPosts token={token} /> : <Navigate to="/login" />
          }
        />

        {/* SINGLE POST */}
        <Route
          path="/post/:id"
          element={
            token ? <SinglePost token={token} /> : <Navigate to="/login" />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <Login setToken={setToken} setRole={setRole} />
            )
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            token ? <Navigate to="/" /> : <Register />
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;