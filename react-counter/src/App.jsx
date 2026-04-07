import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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

  // Validate token
  const initialToken =
    storedToken && !isTokenExpired(storedToken)
      ? storedToken
      : null;

  // Remove expired token
  if (storedToken && isTokenExpired(storedToken)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  const [token, setToken] = useState(initialToken);
  const [role, setRole] = useState(storedRole);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <div className="app-container">
      <Navbar token={token} role={role} onLogout={handleLogout} />

      <Routes>
        {/* Home */}
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

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            token ? <Profile token={token} /> : <Navigate to="/login" />
          }
        />

        {/* Bookmarks */}
        <Route
          path="/bookmarks"
          element={token ? <Bookmarks /> : <Navigate to="/login" />}
        />

        {/* Liked Posts */}
        <Route
          path="/liked-posts"
          element={token ? <LikedPosts /> : <Navigate to="/login" />}
        />

        {/* Single Post */}
        <Route
          path="/post/:id"
          element={token ? <SinglePost /> : <Navigate to="/login" />}
        />

        {/* Login */}
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

        {/* Register */}
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </div>
  );
}

export default App;