const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

/* ================= CREATE POST ================= */
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

/* ================= GET ALL POSTS (DAY-33 UPDATED) ================= */
exports.getPosts = asyncHandler(async (req, res) => {
  let { page = 1, limit = 5, search = "", sort = "latest" } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  // 🔍 Search (title)
  const query = {
    title: { $regex: search, $options: "i" },
  };

  // 🔽 Sorting
  let sortOption = { createdAt: -1 }; // latest
  if (sort === "oldest") sortOption = { createdAt: 1 };

  // 📄 Pagination
  const posts = await Post.find(query)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Post.countDocuments(query);

  // 💬 Add comments count
  const postsWithCounts = await Promise.all(
    posts.map(async (post) => {
      const commentsCount = await Comment.countDocuments({
        post: post._id,
      });

      return {
        ...post._doc,
        commentsCount,
      };
    })
  );

  res.status(200).json({
    success: true,
    page,
    totalPages: Math.ceil(total / limit),
    total,
    data: postsWithCounts,
  });
});

/* ================= GET SINGLE POST ================= */
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

/* ================= UPDATE POST ================= */
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

/* ================= DELETE POST ================= */
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

/* ================= LIKE POST ================= */
exports.likePost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const postId = req.params.postId;

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.likedPosts.includes(postId)) {
    user.likedPosts = user.likedPosts.filter(
      (id) => id.toString() !== postId
    );
  } else {
    user.likedPosts.push(postId);
  }

  await user.save();

  res.status(200).json({
    success: true,
    likedPosts: user.likedPosts,
  });
});

/* ================= BOOKMARK POST ================= */
exports.bookmarkPost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const postId = req.params.postId;

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.bookmarks.includes(postId)) {
    user.bookmarks = user.bookmarks.filter(
      (id) => id.toString() !== postId
    );
  } else {
    user.bookmarks.push(postId);
  }

  await user.save();

  res.status(200).json({
    success: true,
    bookmarks: user.bookmarks,
  });
});

/* ================= GET BOOKMARKED POSTS ================= */
exports.getBookmarkedPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("bookmarks")
    .select("bookmarks");

  res.status(200).json({
    success: true,
    data: user.bookmarks,
  });
});

/* ================= GET LIKED POSTS ================= */
exports.getLikedPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("likedPosts")
    .select("likedPosts");

  res.status(200).json({
    success: true,
    data: user.likedPosts,
  });
});