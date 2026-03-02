import { useState } from "react";
import { loginUser } from "../services/api";
import "../styles/login.css";

function Login({ setToken, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await loginUser(email, password);

    if (data.success) {
      // 🔐 Store token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Update App state
      setToken(data.token);
      setRole(data.role);
    } else {
      alert(data.message || "Invalid credentials ❌");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;