import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // UPDATE
      await fetch(`http://localhost:5000/api/posts/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      setEditId(null);
    } else {
      // CREATE
      await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
    }

    setTitle("");
    setBody("");
    fetchPosts();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
    });
    fetchPosts();
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditId(post._id);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Day-9 – Full MERN CRUD 🚀</h1>

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

          <button type="submit">
            {editId ? "Update Post" : "Add Post"}
          </button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card-container">
            {posts.map((post) => (
              <div key={post._id} className="card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>

                <button onClick={() => handleEdit(post)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;