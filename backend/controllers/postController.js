const Post = require("../models/Post");
const asyncHandler = require("../middleware/asyncHandler");

// CREATE POST
exports.createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    const error = new Error("Title and body are required");
    error.statusCode = 400;
    throw error;
  }

  const newPost = await Post.create({ title, body });

  res.status(201).json({
    success: true,
    data: newPost,
  });
});

// READ ALL POSTS
exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// GET SINGLE POST
exports.getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

// UPDATE POST
exports.updatePost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    const error = new Error("Title and body are required");
    error.statusCode = 400;
    throw error;
  }

  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    { title, body },
    { new: true }
  );

  if (!updated) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: updated,
  });
});

// DELETE POST
exports.deletePost = asyncHandler(async (req, res) => {
  const deleted = await Post.findByIdAndDelete(req.params.id);

  if (!deleted) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});