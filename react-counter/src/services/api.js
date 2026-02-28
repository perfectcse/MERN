const BASE_URL = "http://localhost:5000/api";

/* ================= AUTH ================= */

// 🔹 Register
export const registerUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

// 🔹 Login
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};


/* ================= POSTS ================= */

// 🔹 Get Posts
export const fetchPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`);
  return res.json();
};

// 🔹 Create Post (Protected)
export const createPost = async (token, data) => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};