import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch posts
  const fetchPosts = () => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = { title, body };

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    setTitle("");
    setBody("");

    fetchPosts(); // Refresh posts
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Day-7 – MERN Full Integration 🚀</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Enter content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>

          <button type="submit">Add Post</button>
        </form>

        {/* POSTS */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card-container">
            {posts.map((post) => (
              <div key={post._id} className="card">
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