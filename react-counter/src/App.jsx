import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH POSTS (Updated for new backend response)
  const fetchPosts = () => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data); // 🔥 IMPORTANT FIX
        } else {
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/posts/${editId}`
      : "http://localhost:5000/api/posts";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    setTitle("");
    setBody("");
    setEditId(null);

    fetchPosts();
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
    });

    fetchPosts();
  };

  // ✅ EDIT
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditId(post._id);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Day-11 – Professional MERN API 🚀</h1>

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
            {posts.length === 0 ? (
              <p>No posts available</p>
            ) : (
              posts.map((post) => (
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;