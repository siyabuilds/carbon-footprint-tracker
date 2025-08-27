import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export async function register({ username, email, password }) {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const { message, error: errorCode, details } = error.response.data;
      const enhancedError = new Error(details || message || "Unknown error");
      enhancedError.code = errorCode;
      enhancedError.status = error.response.status;
      enhancedError.originalError = error;
      throw enhancedError;
    }
    throw error;
  }
}

export async function login({ identifier, password }) {
  const isEmail = identifier.trim().includes("@");
  const payload = { password };

  if (isEmail) payload.email = identifier.trim();
  else payload.username = identifier.trim();

  try {
    const res = await axios.post(`${API_URL}/login`, payload);
    const data = res.data;

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      const { message, error: errorCode, details } = error.response.data;
      const enhancedError = new Error(details || message || "Unknown error");
      enhancedError.code = errorCode;
      enhancedError.status = error.response.status;
      enhancedError.originalError = error;
      throw enhancedError;
    }
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  return !!getToken() && !!getCurrentUser();
}
