const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const errorHandler = require("./middleware/errorMiddleware");
const postRoutes = require("./routes/postRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Connection Error ❌", err));

// Routes
app.use("/api/posts", postRoutes);

// 404 Route Handler (for unknown routes)
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error); // send to error middleware
});

// 🔥 Centralized Error Middleware (MUST BE LAST)
app.use(errorHandler);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});