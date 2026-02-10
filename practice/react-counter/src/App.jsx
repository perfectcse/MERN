import { useState } from "react";
import "./App.css";
function App() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Day 2 – React Logic</h1>

      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Message
      </button>

      {show && <p>Hello, welcome to React 🚀</p>}

      <br /><br />

      <input
        type="text"
        placeholder="Type your name"
        onChange={(e) => setName(e.target.value)}
      />

      {name && <h3>Your name: {name}</h3>}
    </div>
  );
}

export default App;
