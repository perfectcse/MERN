const express = require("express");
const Post = require("../models/Post");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json({ success: true, data: posts });
});

// Create Post (Protected)
router.post("/", protect, async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    body: req.body.body,
    user: req.user,
  });

  res.json({ success: true, data: post });
});

module.exports = router;