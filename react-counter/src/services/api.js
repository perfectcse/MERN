const BASE_URL = "http://localhost:5000/api";

/* ================= COMMON FETCH ================= */
const apiRequest = async (url, method = "GET", body = null, token = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) options.body = JSON.stringify(body);
    if (token) options.headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url, options);
    return await res.json();
  } catch {
    return { success: false, message: "Server error" };
  }
};

/* ================= AUTH ================= */
export const registerUser = (email, password) =>
  apiRequest(`${BASE_URL}/auth/register`, "POST", { email, password });

export const loginUser = (email, password) =>
  apiRequest(`${BASE_URL}/auth/login`, "POST", { email, password });

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

/* ================= COMMENTS ================= */
export const getComments = (postId) =>
  apiRequest(`${BASE_URL}/comments/${postId}`);

export const addComment = (token, postId, text) =>
  apiRequest(
    `${BASE_URL}/comments/${postId}`,
    "POST",
    { text },
    token
  );

export const deleteComment = (token, commentId) =>
  apiRequest(
    `${BASE_URL}/comments/${commentId}`,
    "DELETE",
    null,
    token
  );

/* ================= PROFILE ================= */
export const getProfile = (token) =>
  apiRequest(`${BASE_URL}/auth/me`, "GET", null, token);