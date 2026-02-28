const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const router = express.Router();


// 🔐 Auth Middleware
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


// 📌 GET ALL POSTS
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json({ success: true, data: posts });
});


// 📌 CREATE POST
router.post("/", protect, async (req, res) => {
  const { title, body } = req.body;

  const newPost = await Post.create({
    title,
    body,
  });

  res.json({ success: true, data: newPost });
});


// ✏️ UPDATE POST
router.put("/:id", protect, async (req, res) => {
  const { title, body } = req.body;

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { title, body },
    { new: true }
  );

  res.json({ success: true, data: updatedPost });
});


// 🗑 DELETE POST
router.delete("/:id", protect, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: "Post deleted" });
});

module.exports = router;