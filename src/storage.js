// LocalStorage management for activity logs
const STORAGE_KEY = "carbon-footprint-logs";

export function saveActivityLogs(logs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error("Failed to save activity logs:", error);
  }
}

export function loadActivityLogs() {
  try {
    const logs = localStorage.getItem(STORAGE_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error("Failed to load activity logs:", error);
    return [];
  }
}

export function clearActivityLogs() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear activity logs:", error);
  }
}
