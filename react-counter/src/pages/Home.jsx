import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  bookmarkPost,
} from "../services/api";

import "../styles/home.css";

function Home({ token, role }) {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  /* ================= LOAD POSTS ================= */
  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPosts({
        page,
        limit: 5,
        search,
        sort,
      });

      if (data.success) {
        setPosts(data.data);
        setTotalPages(data.totalPages);
      } else {
        toast.error("Failed to load posts");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }, [page, search, sort]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  /* ================= RELOAD ================= */
  const reloadPosts = async () => {
    const data = await fetchPosts({
      page,
      limit: 5,
      search,
      sort,
    });

    if (data.success) {
      setPosts(data.data);
      setTotalPages(data.totalPages);
    }
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("Login required 🔐");

    setBtnLoading(true);

    try {
      if (editId) {
        await updatePost(token, editId, { title, body });
        toast.success("Post updated ✅");
        setEditId(null);
      } else {
        await createPost(token, { title, body });
        toast.success("Post created 🚀");
      }

      setTitle("");
      setBody("");
      reloadPosts();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    setBtnLoading(true);

    try {
      const res = await deletePost(token, id);

      if (!res.success) return toast.error(res.message);

      toast.success("Post deleted 🗑️");
      reloadPosts();
    } catch {
      toast.error("Delete failed");
    } finally {
      setBtnLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditId(post._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= LIKE ================= */
  const handleLike = async (postId) => {
    if (!token) return toast.error("Login required 🔐");

    try {
      await likePost(token, postId);
      toast.success("Liked ❤️");
      reloadPosts();
    } catch {
      toast.error("Like failed");
    }
  };

  /* ================= BOOKMARK ================= */
  const handleBookmark = async (postId) => {
    if (!token) return toast.error("Login required 🔐");

    try {
      await bookmarkPost(token, postId);
      toast.success("Bookmarked 🔖");
      reloadPosts();
    } catch {
      toast.error("Bookmark failed");
    }
  };

  return (
    <div className="home-container">
      {/* ================= FILTERS ================= */}
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

      {/* ================= FORM ================= */}
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

          <button type="submit" disabled={btnLoading}>
            {btnLoading
              ? "Processing..."
              : editId
              ? "Update Post"
              : "Add Post"}
          </button>
        </form>
      </div>

      {/* ================= POSTS ================= */}
      <div className="posts-section">
        <h2 className="section-title">All Posts</h2>

        {loading ? (
          <p className="empty-text">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="empty-text">No posts found</p>
        ) : (
          <>
            <div className="post-list">
              {posts.map((post) => (
                <div key={post._id} className="post-card">
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>

                  <div className="post-info">
                    <span>💬 {post.commentsCount || 0}</span>
                    <span>
                      📅 {new Date(post.createdAt).toDateString()}
                    </span>
                  </div>

                  {/* Like + Bookmark */}
                  <div className="post-buttons">
                    <button
                      className="like-btn"
                      disabled={!token}
                      onClick={() => handleLike(post._id)}
                    >
                      ❤️ Like
                    </button>

                    <button
                      className="bookmark-btn"
                      disabled={!token}
                      onClick={() => handleBookmark(post._id)}
                    >
                      🔖 Bookmark
                    </button>
                  </div>

                  {/* View */}
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/post/${post._id}`)}
                  >
                    View Post
                  </button>

                  {/* Actions */}
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

            {/* ================= PAGINATION ================= */}
            <div className="pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>

              <span>
                {page} / {totalPages}
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