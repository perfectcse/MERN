const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const commentController = require("../controllers/commentController");

// Add comment
router.post("/:postId", authMiddleware.protect, commentController.addComment);

// Get comments
router.get("/:postId", commentController.getComments);

// Delete comment
router.delete("/:commentId", authMiddleware.protect, commentController.deleteComment);

module.exports = router;