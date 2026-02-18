const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Post = require("./models/Post"); // Correct import

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((error) => console.error("MongoDB Connection Error ❌", error));

// Test Route
app.get("/", (req, res) => {
  res.send("Server running with MongoDB 🚀");
});

// 🔥 Create Post
app.post("/api/posts", async (req, res) => {
  try {
    const { title, body } = req.body;

    const newPost = new Post({ title, body });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 🔥 Delete Post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Post.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Get All Posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});