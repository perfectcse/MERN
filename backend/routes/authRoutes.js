const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Debug (remove later)
    console.log("Register Body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Safe role assignment
    let userRole = "user";
    if (role && role === "admin") {
      userRole = "admin";
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      role: user.role,
    });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      role: user.role,
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ================= GET CURRENT USER ================= */
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ================= UPLOAD PROFILE IMAGE ================= */
router.put(
  "/upload-profile",
  protect,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      const user = await User.findById(req.user.id);

      user.profileImage = `/uploads/${req.file.filename}`;
      await user.save();

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log("Upload error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

module.exports = router;