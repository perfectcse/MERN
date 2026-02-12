import { useState } from "react";
import './App.css';
function App() {
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(title);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    })
      .then((res) => res.json())
      .then((data) => console.log("Response:", data));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Day 4 – Form & POST</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {submitted && <h3>Submitted: {submitted}</h3>}
    </div>
  );
}

export default App;
