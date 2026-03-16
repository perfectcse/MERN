const express = require("express");
const Post = require("../models/Post");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { validatePost } = require("../middleware/validationMiddleware");

const router = express.Router();


// 📌 GET POSTS WITH SEARCH + PAGINATION (Public)

router.get("/", async (req, res, next) => {

  try {

    // Query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // Search filter
    const filter = {
      title: { $regex: search, $options: "i" }
    };

    // Fetch posts
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count filtered posts
    const totalPosts = await Post.countDocuments(filter);

    res.json({
      success: true,
      page,
      limit,
      search,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
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