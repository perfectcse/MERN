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
} = require("../controllers/postController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { validatePost } = require("../middleware/validationMiddleware");


// GET POSTS (Search + Sort + Pagination handled in controller later)
router.get("/", getPosts);

// GET SINGLE POST
router.get("/:id", getSinglePost);

// CREATE POST
router.post("/", protect, validatePost, createPost);

// UPDATE POST
router.put("/:id", protect, validatePost, updatePost);

// DELETE POST
router.delete("/:id", protect, adminOnly, deletePost);

// LIKE POST
router.post("/like/:postId", protect, likePost);

// BOOKMARK POST
router.post("/bookmark/:postId", protect, bookmarkPost);

module.exports = router;