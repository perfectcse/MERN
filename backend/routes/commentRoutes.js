const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const commentController = require("../controllers/commentController");

// Add comment or reply
router.post("/:postId", authMiddleware.protect, commentController.addComment);

// Get comments for a post
router.get("/:postId", commentController.getComments);

// Delete comment
router.delete("/:commentId", authMiddleware.protect, commentController.deleteComment);

// Like comment
router.put("/like/:commentId", authMiddleware.protect, commentController.likeComment);

module.exports = router;