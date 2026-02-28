import { useEffect, useState } from "react";
import { fetchPosts, createPost } from "../services/api";
import "../styles/home.css";

function Home({ token }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Load posts
  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      if (data.success) {
        setPosts(data.data);
      }
    };

    loadPosts();
  }, []);

  // Create post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Login first 🔐");
      return;
    }

    await createPost(token, { title, body });

    const data = await fetchPosts();
    if (data.success) {
      setPosts(data.data);
    }

    setTitle("");
    setBody("");
  };

  return (
    <div className="home-container">
      
      {/* ================= FORM SECTION ================= */}
      <div className="form-section">
        <h2 className="section-title">Create New Post</h2>

        <form className="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Write something..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />

          <button type="submit">Add Post</button>
        </form>
      </div>

      {/* ================= POSTS SECTION ================= */}
      <div className="posts-section">
        <h2 className="section-title">All Posts</h2>

        {posts.length === 0 ? (
          <p className="empty-text">No posts available</p>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <div key={post._id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;