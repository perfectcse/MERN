import axios from "axios";
import { useState } from "react";

/* ================= BUILD COMMENT TREE ================= */
const buildCommentTree = (comments) => {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c._id] = { ...c, replies: [] };
  });

  comments.forEach((c) => {
    if (c.parentComment) {
      map[c.parentComment]?.replies.push(map[c._id]);
    } else {
      roots.push(map[c._id]);
    }
  });

  return roots;
};

/* ================= COMMENT ITEM ================= */
const CommentItem = ({ comment, reload }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const token = localStorage.getItem("token");

  /* Delete Comment */
  const deleteComment = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/comments/${comment._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      reload();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  /* Reply Comment */
  const replyComment = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/comments/${comment.post}`,
        {
          text: replyText,
          parentComment: comment._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReplyText("");
      setShowReply(false);
      reload();
    } catch (err) {
      console.log("Reply error:", err);
    }
  };

  /* Like Comment */
  const likeComment = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/comments/like/${comment._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      reload();
    } catch (err) {
      console.log("Like error:", err);
    }
  };

  /* Edit Comment */
  const editComment = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/comments/edit/${comment._id}`,
        { text: editText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEditing(false);
      reload();
    } catch (err) {
      console.log("Edit error:", err);
    }
  };

  return (
    <div className="comment-wrapper">
      <div className="comment">
        <div className="comment-left">
          <strong>{comment.user?.email || "User"}</strong>:

          {editing ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <>
              {" "}{comment.text}
              {comment.edited && (
                <span className="edited"> (edited)</span>
              )}
            </>
          )}

          <div className="comment-meta">
            👍 {comment.likes || 0} •{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="comment-right">
          <button onClick={() => setShowReply(!showReply)}>
            Reply
          </button>

          <button onClick={likeComment}>
            Like
          </button>

          {editing ? (
            <button onClick={editComment}>
              Save
            </button>
          ) : (
            <button onClick={() => setEditing(true)}>
              Edit
            </button>
          )}

          <button onClick={deleteComment}>
            Delete
          </button>
        </div>
      </div>

      {showReply && (
        <div className="reply-box">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write reply..."
          />
          <button onClick={replyComment}>Send</button>
        </div>
      )}

      {/* Recursive Replies */}
      {comment.replies &&
        comment.replies.map((reply) => (
          <div className="reply" key={reply._id}>
            <CommentItem comment={reply} reload={reload} />
          </div>
        ))}
    </div>
  );
};

/* ================= COMMENTS LIST ================= */
const CommentsList = ({ comments, reload }) => {
  if (!Array.isArray(comments)) return <p>No comments</p>;

  const nestedComments = buildCommentTree(comments);

  return (
    <div className="comments-container">
      {nestedComments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          reload={reload}
        />
      ))}
    </div>
  );
};

export default CommentsList;