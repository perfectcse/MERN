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
router.get("/bookmarks", protect, getBookmarkedPosts);
router.get("/liked", protect, getLikedPosts);

/* ================= ACTIONS ================= */
router.put("/like/:postId", protect, likePost);       // ✅ FIXED
router.put("/bookmark/:postId", protect, bookmarkPost); // ✅ FIXED

/* ================= POSTS ================= */
router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", protect, validatePost, createPost);
router.put("/:id", protect, validatePost, updatePost);
router.delete("/:id", protect, adminOnly, deletePost);

module.exports = router;