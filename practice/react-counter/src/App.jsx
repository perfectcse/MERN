import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1>Day-5 – React + Express</h1>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="card-container">
            {posts.map((post) => (
              <div key={post.id} className="card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;