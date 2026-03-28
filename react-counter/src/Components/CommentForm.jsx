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

      // Instead of reload, refresh comments
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "15px" }}
    >
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "8px",
          width: "70%",
          marginRight: "10px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 12px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;