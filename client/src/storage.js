import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "/api";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function saveActivityLog(log) {
  try {
    const res = await axios.post(`${API_URL}/activities`, log, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error("Failed to save activity log:", error);
  }
}

export async function loadActivityLogs() {
  try {
    const res = await axios.get(`${API_URL}/activities`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error("Failed to load activity logs:", error);
    return [];
  }
}

export async function deleteActivityLog(id) {
  try {
    await axios.delete(`${API_URL}/activities/${id}`, {
      headers: getAuthHeader(),
    });
  } catch (error) {
    console.error("Failed to delete activity log:", error);
  }
}

export async function clearActivityLogs() {
  try {
    await axios.delete(`${API_URL}/activities`, {
      headers: getAuthHeader(),
    });
  } catch (error) {
    console.error("Failed to clear activity logs:", error);
  }
}
