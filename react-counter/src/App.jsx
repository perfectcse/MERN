import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

import "./styles/global.css";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="app-container">
      <Navbar token={token} onLogout={handleLogout} />

      <Routes>
        {/* 🔒 Protected Home Route */}
        <Route
          path="/"
          element={
            token ? <Home token={token} /> : <Navigate to="/login" />
          }
        />

        {/* 🔐 Login */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />

        {/* 📝 Register */}
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