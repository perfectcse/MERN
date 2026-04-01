import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/api";

import "../styles/home.css";

function Home({ token, role }) {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination + Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  // Load posts
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts({ page, search, sort });

        if (data.success) {
          setPosts(data.data);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page, search, sort]);

  // Reload posts after create/update/delete
  const reloadPosts = async () => {
    const data = await fetchPosts({ page, search, sort });
    if (data.success) {
      setPosts(data.data);
      setTotalPages(data.totalPages);
    }
  };

  // Create or Update Post
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
      reloadPosts();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // Delete Post
  const handleDelete = async (id) => {
    try {
      const response = await deletePost(token, id);

      if (!response.success) {
        alert(response.message);
        return;
      }

      reloadPosts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Edit Post
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditId(post._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {/* SEARCH + SORT */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* FORM */}
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
          ></textarea>

          <button type="submit">
            {editId ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>

      {/* POSTS */}
      <div className="posts-section">
        <h2 className="section-title">All Posts</h2>

        {loading ? (
          <p className="empty-text">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="empty-text">No posts available</p>
        ) : (
          <>
            <div className="post-list">
              {posts.map((post) => (
                <div key={post._id} className="post-card">
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>

                  {/* Post Info */}
                  <div className="post-info">
                    <span>💬 {post.commentsCount || 0} Comments</span>
                    <span>
                      📅 {new Date(post.createdAt).toDateString()}
                    </span>
                  </div>

                  {/* View Single Post */}
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/post/${post._id}`)}
                  >
                    View Post
                  </button>

                  {/* Edit/Delete */}
                  {token && (
                    <div className="post-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </button>

                      {role === "admin" && (
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(post._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;