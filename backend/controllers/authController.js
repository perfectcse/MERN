const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");

/* ================= GENERATE TOKEN ================= */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ================= REGISTER USER ================= */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 5) {
    const error = new Error("Password must be at least 5 characters");
    error.statusCode = 400;
    throw error;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Save role safely
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role === "admin" ? "admin" : "user",
  });

  res.status(201).json({
    success: true,
    token: generateToken(user._id, user.role),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      bookmarks: user.bookmarks,
      likedPosts: user.likedPosts,
      createdAt: user.createdAt,
    },
  });
});

/* ================= LOGIN USER ================= */
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  res.status(200).json({
    success: true,
    token: generateToken(user._id, user.role),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      bookmarks: user.bookmarks,
      likedPosts: user.likedPosts,
      createdAt: user.createdAt,
    },
  });
});

/* ================= GET PROFILE ================= */
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/* ================= UPLOAD PROFILE IMAGE ================= */
exports.uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    const error = new Error("No image uploaded");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  user.profileImage = `/uploads/${req.file.filename}`;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile image updated",
    data: user,
  });
});