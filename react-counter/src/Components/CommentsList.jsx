import axios from "axios";
import { useState } from "react";

// Build nested comment tree
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

// Recursive Comment Component
const CommentItem = ({ comment, reload }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  // Delete Comment
  const deleteComment = async () => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/comments/${comment._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    reload();
  };

  // Reply Comment
  const replyComment = async () => {
    const token = localStorage.getItem("token");

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
  };

  // Like Comment
  const likeComment = async () => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/comments/like/${comment._id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    reload();
  };

  // Edit Comment
  const editComment = async () => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/comments/edit/${comment._id}`,
      { text: editText },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setEditing(false);
    reload();
  };

  return (
    <div className="comment-wrapper">
      <div className="comment">
        <div className="comment-left">
          <strong>{comment.user?.email}</strong>:

          {editing ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <>
              {" "}{comment.text}
              {comment.edited && <span className="edited">(edited)</span>}
            </>
          )}

          <div className="comment-meta">
            👍 {comment.likes} •{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="comment-right">
          <button className="reply-btn" onClick={() => setShowReply(!showReply)}>
            Reply
          </button>

          <button className="reply-btn" onClick={likeComment}>
            Like
          </button>

          {editing ? (
            <button className="reply-btn" onClick={editComment}>
              Save
            </button>
          ) : (
            <button
              className="reply-btn"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}

          <button className="delete-btn" onClick={deleteComment}>
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

      {/* Render Replies Recursively */}
      {comment.replies &&
        comment.replies.map((reply) => (
          <div className="reply" key={reply._id}>
            <CommentItem comment={reply} reload={reload} />
          </div>
        ))}
    </div>
  );
};

const CommentsList = ({ comments, onDelete }) => {
  if (!Array.isArray(comments)) return <p>No comments</p>;

  const nestedComments = buildCommentTree(comments);

  return (
    <div className="comments-container">
      {nestedComments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          reload={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentsList;