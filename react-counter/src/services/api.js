const BASE_URL = "http://localhost:5000/api";

/* ================= AUTH ================= */

// 🔹 Register
export const registerUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return await res.json();
  } catch {
    return { success: false, message: "Server error" };
  }
};

// 🔹 Login
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return await res.json();
  } catch {
    return { success: false, message: "Server error" };
  }
};

/* ================= POSTS ================= */

// 🔥 UPDATED (Search + Sort + Pagination)
export const fetchPosts = async ({
  page = 1,
  limit = 5,
  search = "",
  sort = "latest",
} = {}) => {
  try {
    const res = await fetch(
      `${BASE_URL}/posts?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
    );

    return await res.json();
  } catch {
    return { success: false, message: "Failed to fetch posts" };
  }
};

// 🔹 Create Post
export const createPost = async (token, data) => {
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch {
    return { success: false, message: "Failed to create post" };
  }
};

// 🔹 Update Post
export const updatePost = async (token, id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch {
    return { success: false, message: "Failed to update post" };
  }
};

// 🔹 Delete Post
export const deletePost = async (token, id) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch {
    return { success: false, message: "Failed to delete post" };
  }
};