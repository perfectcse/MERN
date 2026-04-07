const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
  bookmarkPost,
  getBookmarkedPosts,
  getLikedPosts,
} = require("../controllers/postController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { validatePost } = require("../middleware/validationMiddleware");


/* ================= SPECIAL ROUTES ================= */

// 🔥 MUST BE ABOVE /:id
router.get("/bookmarks", protect, getBookmarkedPosts);
router.get("/liked", protect, getLikedPosts);


/* ================= POSTS ================= */

// GET ALL POSTS
router.get("/", getPosts);

// GET SINGLE POST
router.get("/:id", getSinglePost);

// CREATE POST
router.post("/", protect, validatePost, createPost);

// UPDATE POST
router.put("/:id", protect, validatePost, updatePost);

// DELETE POST
router.delete("/:id", protect, adminOnly, deletePost);


/* ================= ACTIONS ================= */

// LIKE POST
router.post("/like/:postId", protect, likePost);

// BOOKMARK POST
router.post("/bookmark/:postId", protect, bookmarkPost);


module.exports = router;