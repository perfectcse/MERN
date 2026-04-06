const Comment = require("../models/Comment");

/* ================= ADD COMMENT / REPLY ================= */
exports.addComment = async (req, res) => {
  try {
    const { text, parentComment } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text required",
      });
    }

    const comment = await Comment.create({
      text,
      user: req.user._id,
      post: req.params.postId,
      parentComment: parentComment || null,
    });

    // Populate user email
    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "email");

    res.json({
      success: true,
      data: populatedComment,
    });
  } catch (err) {
    console.log("Add Comment Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET COMMENTS ================= */
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
    console.log("Get Comments Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE COMMENT ================= */
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (
      comment.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await comment.deleteOne();

    res.json({
      success: true,
      message: "Comment deleted",
    });
  } catch (err) {
    console.log("Delete Comment Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= LIKE / UNLIKE COMMENT ================= */
exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    const userId = req.user._id;

    if (comment.likedBy.includes(userId)) {
      // Unlike
      comment.likedBy = comment.likedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Like
      comment.likedBy.push(userId);
    }

    comment.likes = comment.likedBy.length;

    await comment.save();

    res.json({
      success: true,
      data: comment,
    });
  } catch (err) {
    console.log("Like Comment Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= EDIT COMMENT ================= */
exports.editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    comment.text = req.body.text;
    comment.edited = true;

    await comment.save();

    res.json({
      success: true,
      data: comment,
    });
  } catch (err) {
    console.log("Edit Comment Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};