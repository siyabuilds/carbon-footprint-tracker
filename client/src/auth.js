import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:4000/api";

export async function register({ username, email, password }) {
    const res = await axios.post(`${API_URL}/register`, { username, email, password });
    return res.data;
}

export async function login({ email, username, password }) {
    const res = await axios.post(`${API_URL}/login`, { email, username, password });
    const data = res.data;

    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
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
