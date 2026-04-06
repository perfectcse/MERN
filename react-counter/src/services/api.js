const BASE_URL = "http://localhost:5000/api";

/* ================= COMMON API REQUEST ================= */
const apiRequest = async (url, method = "GET", body = null, token = null) => {
  try {
    const options = {
      method,
      headers: {},
    };

    // JSON Body
    if (body && !(body instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    // FormData (File Upload)
    if (body instanceof FormData) {
      options.body = body;
    }

    // Authorization Token
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    return { success: false, message: error.message };
  }
};

/* ================= AUTH ================= */

export const registerUser = (name, email, password, role) =>
  apiRequest(`${BASE_URL}/auth/register`, "POST", {
    name,
    email,
    password,
    role,
  });

export const loginUser = (email, password) =>
  apiRequest(`${BASE_URL}/auth/login`, "POST", {
    email,
    password,
  });

export const getProfile = (token) =>
  apiRequest(`${BASE_URL}/auth/me`, "GET", null, token);

/* ================= PROFILE IMAGE ================= */

export const uploadProfileImage = (token, formData) =>
  apiRequest(`${BASE_URL}/auth/upload-profile`, "PUT", formData, token);

/* ================= POSTS ================= */

export const fetchPosts = ({
  page = 1,
  limit = 5,
  search = "",
  sort = "latest",
} = {}) =>
  apiRequest(
    `${BASE_URL}/posts?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
  );

export const getSinglePost = (id) =>
  apiRequest(`${BASE_URL}/posts/${id}`);

export const createPost = (token, data) =>
  apiRequest(`${BASE_URL}/posts`, "POST", data, token);

export const updatePost = (token, id, data) =>
  apiRequest(`${BASE_URL}/posts/${id}`, "PUT", data, token);

export const deletePost = (token, id) =>
  apiRequest(`${BASE_URL}/posts/${id}`, "DELETE", null, token);

/* ================= POST LIKE + BOOKMARK ================= */

export const likePost = (token, postId) =>
  apiRequest(`${BASE_URL}/posts/like/${postId}`, "PUT", null, token);

export const bookmarkPost = (token, postId) =>
  apiRequest(`${BASE_URL}/posts/bookmark/${postId}`, "PUT", null, token);

/* ================= COMMENTS ================= */

export const getComments = (postId) =>
  apiRequest(`${BASE_URL}/comments/${postId}`);

export const addComment = (token, postId, text, parentComment = null) =>
  apiRequest(
    `${BASE_URL}/comments/${postId}`,
    "POST",
    { text, parentComment },
    token
  );

export const deleteComment = (token, commentId) =>
  apiRequest(
    `${BASE_URL}/comments/${commentId}`,
    "DELETE",
    null,
    token
  );

export const likeComment = (token, commentId) =>
  apiRequest(
    `${BASE_URL}/comments/like/${commentId}`,
    "PUT",
    null,
    token
  );

export const editComment = (token, commentId, text) =>
  apiRequest(
    `${BASE_URL}/comments/edit/${commentId}`,
    "PUT",
    { text },
    token
  );

/* ================= DASHBOARD ================= */

export const getDashboardStats = (token) =>
  apiRequest(`${BASE_URL}/dashboard`, "GET", null, token);