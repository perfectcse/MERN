const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {
    // Run queries in parallel (faster)
    const [totalPosts, totalComments, totalUsers, likesData] =
      await Promise.all([
        Post.countDocuments(),
        Comment.countDocuments(),
        User.countDocuments(),
        Comment.aggregate([
          {
            $group: {
              _id: null,
              totalLikes: { $sum: "$likes" },
            },
          },
        ]),
      ]);

    const totalLikes = likesData[0]?.totalLikes || 0;

    res.json({
      success: true,
      data: {
        totalPosts,
        totalComments,
        totalUsers,
        totalLikes,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};