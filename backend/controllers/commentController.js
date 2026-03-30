const Comment = require("../models/Comment");

// Add Comment / Reply
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      user: req.user._id,
      post: req.params.postId,
      parentComment: req.body.parentComment || null,
    });

    res.json({
      success: true,
      data: comment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Comments
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "email")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      data: comments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);

    res.json({
      success: true,
      message: "Comment deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Like Comment
exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    comment.likes += 1;
    await comment.save();

    res.json({
      success: true,
      data: comment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};