const express = require("express");
const Post = require("../models/Post");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { validatePost } = require("../middleware/validationMiddleware");

const router = express.Router();


// 📌 GET ALL POSTS (Public)
router.get("/", async (req, res, next) => {
  try {

    const posts = await Post.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: posts
    });

  } catch (error) {
    next(error);
  }
});


// 📌 CREATE POST (Protected + Validation)
router.post("/", protect, validatePost, async (req, res, next) => {
  try {

    const { title, body } = req.body;

    const newPost = await Post.create({
      title,
      body
    });

    res.json({
      success: true,
      data: newPost
    });

  } catch (error) {
    next(error);
  }
});


// ✏️ UPDATE POST (Protected + Validation)
router.put("/:id", protect, validatePost, async (req, res, next) => {
  try {

    const { title, body } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedPost
    });

  } catch (error) {
    next(error);
  }
});


// 🗑 DELETE POST (ADMIN ONLY)
router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  try {

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Post deleted by admin"
    });

  } catch (error) {
    next(error);
  }
});


module.exports = router;