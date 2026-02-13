const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, title: "Backend Ready", body: "Express is working" },
    { id: 2, title: "Day-5 MERN", body: "React will connect next" }
  ]);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});