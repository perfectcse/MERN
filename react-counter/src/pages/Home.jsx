import { useEffect, useState } from "react";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/api";
import "../styles/home.css";

function Home({ token }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load posts on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Reload posts after changes
  const reloadPosts = async () => {
    try {
      const data = await fetchPosts();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Reload error:", error);
    }
  };

  // 🔹 Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Login first 🔐");
      return;
    }

    try {
      if (editId) {
        await updatePost(token, editId, { title, body });
        setEditId(null);
      } else {
        await createPost(token, { title, body });
      }

      setTitle("");
      setBody("");
      await reloadPosts();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    if (!token) {
      alert("Login first 🔐");
      return;
    }

    try {
      await deletePost(token, id);
      await reloadPosts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // 🔹 Edit
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditId(post._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-container">

      {/* ================= FORM SECTION ================= */}
      <div className="form-section">
        <h2 className="section-title">
          {editId ? "Update Post" : "Create New Post"}
        </h2>

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

          <button type="submit">
            {editId ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>

      {/* ================= POSTS SECTION ================= */}
      <div className="posts-section">
        <h2 className="section-title">All Posts</h2>

        {loading ? (
          <p className="empty-text">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="empty-text">No posts available</p>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <div key={post._id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.body}</p>

                {token && (
                  <div className="post-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;