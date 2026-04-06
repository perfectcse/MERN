import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { getSinglePost, getComments } from "../services/api";

import CommentForm from "../Components/CommentForm";
import CommentsList from "../Components/CommentsList";

import "../styles/singlePost.css";

const SinglePost = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD POST + COMMENTS ================= */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const postRes = await getSinglePost(id);
      const commentRes = await getComments(id);

      if (postRes.success) {
        setPost(postRes.data);
      }

      if (commentRes.success) {
        setComments(
          Array.isArray(commentRes.data)
            ? commentRes.data
            : []
        );
      }
    } catch (err) {
      console.log("Load error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /* ================= RELOAD COMMENTS ================= */
  const reloadComments = async () => {
    const commentRes = await getComments(id);

    if (commentRes.success) {
      setComments(
        Array.isArray(commentRes.data)
          ? commentRes.data
          : []
      );
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="single-post-container">
      {/* Post */}
      <div className="post-card">
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        <div className="post-meta">
          <span>
            📅 {new Date(post.createdAt).toDateString()}
          </span>
        </div>
      </div>

      {/* Comments */}
      <div className="comment-section">
        <h3>Add Comment</h3>
        <CommentForm
          postId={id}
          onCommentAdded={reloadComments}
        />

        <h3>Comments</h3>
        <CommentsList
          comments={comments}
          reload={reloadComments}
        />
      </div>
    </div>
  );
};

export default SinglePost;