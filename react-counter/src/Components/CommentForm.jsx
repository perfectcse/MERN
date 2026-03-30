import { useState } from "react";
import axios from "axios";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/comments/${postId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");

      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;