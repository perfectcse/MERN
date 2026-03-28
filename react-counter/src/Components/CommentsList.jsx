import axios from "axios";

const CommentsList = ({ comments, onDelete }) => {
  if (!Array.isArray(comments)) {
    return <p>No comments</p>;
  }

  const deleteComment = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onDelete) onDelete();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comments-container">
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <div className="comment-left">
              <strong>{comment.user?.email}</strong>: {comment.text}
            </div>

            <div className="comment-right">
              <button
                className="delete-btn"
                onClick={() => deleteComment(comment._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsList;