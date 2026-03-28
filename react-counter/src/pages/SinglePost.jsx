import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CommentForm from "../Components/CommentForm";
import CommentsList from "../Components/CommentsList";

import "../styles/singlePost.css";

const SinglePost = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );

        const commentRes = await axios.get(
          `http://localhost:5000/api/comments/${id}`
        );

        setPost(postRes.data.data);
        setComments(
          Array.isArray(commentRes.data.data)
            ? commentRes.data.data
            : []
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  // Function to reload comments after add/delete
  const reloadComments = async () => {
    try {
      const commentRes = await axios.get(
        `http://localhost:5000/api/comments/${id}`
      );

      setComments(
        Array.isArray(commentRes.data.data)
          ? commentRes.data.data
          : []
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="single-post-container">
      <div className="post-card">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>

      <div className="comment-section">
        <h3>Add Comment</h3>
        <CommentForm postId={id} onCommentAdded={reloadComments} />

        <h3>Comments</h3>
        <CommentsList comments={comments} onDelete={reloadComments} />
      </div>
    </div>
  );
};

export default SinglePost;
