import { useEffect, useState } from "react";
import { getBookmarkedPosts } from "../services/api";
import { useNavigate } from "react-router-dom";

import "../styles/home.css"; // reuse existing styles

function Bookmarks() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const data = await getBookmarkedPosts(token);

      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.log("Bookmarks error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) return <p className="loading">Loading bookmarks...</p>;

  return (
    <div className="home-container">
      <h2 className="home-title">📌 Bookmarked Posts</h2>

      {posts.length === 0 ? (
        <p className="no-posts">No bookmarks yet</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div
              key={post._id}
              className="post-card"
              onClick={() => navigate(`/post/${post._id}`)}
            >
              <h3>{post.title}</h3>
              <p>{post.body.slice(0, 100)}...</p>

              <div className="post-footer">
                <span>
                  {new Date(post.createdAt).toDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;