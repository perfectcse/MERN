import "../styles/posts.css";

function PostList({ posts }) {
  return (
    <div className="card-container">
      {posts.map((post) => (
        <div key={post._id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;