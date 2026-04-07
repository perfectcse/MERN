import { useEffect, useState } from "react";
import { getLikedPosts } from "../services/api";
import { useNavigate } from "react-router-dom";

import "../styles/liked.css";

function LikedPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchLikedPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const data = await getLikedPosts(token);

      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.log("Liked posts error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedPosts();
  }, []);

  if (loading) return <p className="loading">Loading liked posts...</p>;

  return (
    <div className="liked-container">
      <h2 className="liked-title">❤️ Liked Posts</h2>

      {posts.length === 0 ? (
        <p className="no-posts">No liked posts yet</p>
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

export default LikedPosts;