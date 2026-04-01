const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalComments = await Comment.countDocuments();
    const totalUsers = await User.countDocuments();

    // Sum of likes
    const likesData = await Comment.aggregate([
      {
        $group: {
          _id: null,
          totalLikes: { $sum: "$likes" },
        },
      },
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};