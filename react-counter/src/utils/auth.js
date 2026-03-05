export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const expiry = payload.exp * 1000;
    const now = Date.now();

    return now > expiry;
  } catch {
    return true;
  }
};