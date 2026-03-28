const express = require("express");
const Post = require("../models/Post");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { validatePost } = require("../middleware/validationMiddleware");

const router = express.Router();

// 📌 GET POSTS WITH SEARCH + SORT + PAGINATION + DATE FILTER
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const sort = req.query.sort || "latest";
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const skip = (page - 1) * limit;

    let filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
      ],
    };

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    let sortOption = {};
    if (sort === "latest") sortOption = { createdAt: -1 };
    else if (sort === "oldest") sortOption = { createdAt: 1 };
    else if (sort === "title") sortOption = { title: 1 };
    else sortOption = { createdAt: -1 };

    const posts = await Post.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments(filter);

    res.json({
      success: true,
      page,
      limit,
      search,
      sort,
      startDate,
      endDate,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

// 📌 GET SINGLE POST
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// 📌 CREATE POST
router.post("/", protect, validatePost, async (req, res, next) => {
  try {
    const { title, body } = req.body;

    const newPost = await Post.create({
      title,
      body,
    });

    res.json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
});

// ✏️ UPDATE POST
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
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
});

// 🗑 DELETE POST
router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Post deleted by admin",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;