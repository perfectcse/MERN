import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./Components/Navbar";

import { isTokenExpired } from "./utils/auth";

import "./styles/global.css";

function App() {
  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  const validToken =
    storedToken && !isTokenExpired(storedToken) ? storedToken : null;

  if (storedToken && isTokenExpired(storedToken)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  const [token, setToken] = useState(validToken);
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
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/login" />
          }
        />

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
          element={
            token ? <Navigate to="/" /> : <Register />
          }
        />
      </Routes>
    </div>
  );
}

export default App;