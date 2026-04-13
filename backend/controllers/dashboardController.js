const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {
    // Run all queries in parallel (optimized)
    const [
      totalPosts,
      totalComments,
      totalUsers,
      likesData,
      users,
    ] = await Promise.all([
      Post.countDocuments(),
      Comment.countDocuments(),
      User.countDocuments(),

      // Comment likes aggregation
      Comment.aggregate([
        {
          $group: {
            _id: null,
            totalLikes: { $sum: "$likes" },
          },
        },
      ]),

      // Get users for post likes
      User.find().select("likedPosts"),
    ]);

    // ✅ Comment likes
    const commentLikes = likesData[0]?.totalLikes || 0;

    // ✅ Post likes (from user.likedPosts)
    let postLikes = 0;
    users.forEach((user) => {
      postLikes += user.likedPosts.length;
    });

    // ✅ Total likes (post + comment)
    const totalLikes = commentLikes + postLikes;

    res.status(200).json({
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