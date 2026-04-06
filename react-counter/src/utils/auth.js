export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    if (!payload.exp) return true;

    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};