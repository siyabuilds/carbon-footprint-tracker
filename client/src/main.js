import "./style.css";
import { activityData } from "./activity-data.js";
import { showActivityForm } from "./form.js";
import { saveActivityLogs, loadActivityLogs } from "./storage.js";
import { calculateTotalEmissions } from "./calculations.js";
import {
  renderActivityLogs,
  renderTotalEmissions,
  renderCategoryBreakdown,
  confirmDeleteActivity,
  confirmClearAllActivities,
} from "./ui.js";
import {
  getCategories,
  filterLogsByCategory,
  createFilterComponent,
} from "./filter.js";
import { renderEmissionsChart } from "./chart.js";
import { getCurrentUser, login, register, logout, isLoggedIn } from "./auth.js";

let activityLogs = loadActivityLogs();
let selectedCategory = "All";

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

const initializeApp = () => {
  if (isLoggedIn()) {
    showMainApp();
  } else {
    showAuthScreen();
  }
};

const showAuthScreen = () => {
  document.getElementById("auth-container").style.display = "flex";
  document.getElementById("app-container").style.display = "none";
  setupAuthEventListeners();
};

const showMainApp = () => {
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("app-container").style.display = "block";
  setupAppEventListeners();
  setupFilterComponent();
  updateDisplay();
};

const setupAuthEventListeners = () => {
  // Tab switching
  document
    .getElementById("login-tab")
    .addEventListener("click", () => switchTab("login"));
  document
    .getElementById("register-tab")
    .addEventListener("click", () => switchTab("register"));

  // Form submissions
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document
    .getElementById("register-form")
    .addEventListener("submit", handleRegister);
};

const switchTab = (tab) => {
  const loginTab = document.getElementById("login-tab");
  const registerTab = document.getElementById("register-tab");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (tab === "login") {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  } else {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.style.display = "block";
    loginForm.style.display = "none";
  }
};

const handleLogin = async (e) => {
  e.preventDefault();
  const identifier = document.getElementById("login-identifier").value;
  const password = document.getElementById("login-password").value;

  try {
    await login({ identifier, password });
    showMainApp();
  } catch (error) {
    // Enhanced error display based on error code
    let errorMessage = "Login failed";

    if (error.code === "USER_NOT_FOUND") {
      errorMessage = "No account found with this email address";
    } else if (error.code === "INVALID_PASSWORD") {
      errorMessage = "Incorrect password. Please try again";
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    alert(errorMessage);
  }
};

const handleRegister = async (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    await register({ username, email, password });
    // Auto-login after successful registration using email
    await login({ identifier: email, password });
    showMainApp();
  } catch (error) {
    // Enhanced error display based on error code
    let errorMessage = "Registration failed";

    if (error.code === "EMAIL_EXISTS") {
      errorMessage = "An account with this email already exists";
    } else if (error.code === "USERNAME_EXISTS") {
      errorMessage = "This username is already taken";
    } else if (error.code === "INVALID_EMAIL") {
      errorMessage = "Please enter a valid email address";
    } else if (error.code === "WEAK_PASSWORD") {
      errorMessage = "Password must be at least 6 characters long";
    } else if (error.code === "MISSING_FIELDS") {
      errorMessage = "Please fill in all required fields";
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    alert(errorMessage);
  }
};

const setupAppEventListeners = () => {
  // Add activity button
  document
    .getElementById("add-activity-btn")
    .addEventListener("click", handleAddActivity);

  // Clear all data button
  document
    .getElementById("clear-all-btn")
    .addEventListener("click", handleClearAll);

  // Logout button
  document.getElementById("logout-btn").addEventListener("click", handleLogout);

  // Activity log delete buttons (event delegation)
  document
    .getElementById("activity-logs")
    .addEventListener("click", handleDeleteActivity);
};

const handleLogout = () => {
  logout();
  showAuthScreen();
};

const handleAddActivity = async () => {
  const log = await showActivityForm(activityData);
  if (log) {
    log.timestamp = new Date().toISOString();
    activityLogs.push(log);
    saveActivityLogs(activityLogs);
    updateDisplay();
  }
};

const handleDeleteActivity = async (event) => {
  if (event.target.closest(".delete-btn")) {
    const index = parseInt(event.target.closest(".delete-btn").dataset.index);
    const activity = activityLogs[index];
    const confirmed = await confirmDeleteActivity(activity.activity);

    if (confirmed) {
      activityLogs.splice(index, 1);
      saveActivityLogs(activityLogs);
      updateDisplay();
    }
  }
};

const handleClearAll = async () => {
  const confirmed = await confirmClearAllActivities();

  if (confirmed) {
    activityLogs = [];
    saveActivityLogs(activityLogs);
    updateDisplay();
  }
};

const updateDisplay = () => {
  const totalEmissions = calculateTotalEmissions(activityLogs);
  renderTotalEmissions(
    totalEmissions,
    document.getElementById("total-emissions")
  );

  const filteredLogs = filterLogsByCategory(activityLogs, selectedCategory);
  renderActivityLogs(filteredLogs, document.getElementById("activity-logs"));
  renderCategoryBreakdown(
    filteredLogs,
    document.getElementById("category-breakdown")
  );

  // Toggle visual summary section based on filtered logs
  const visualSummarySection = document.getElementById("visual-summary");
  if (filteredLogs.length === 0) {
    visualSummarySection.style.display = "none";
  } else {
    visualSummarySection.style.display = "block";
    const chartContainer = document.querySelector(".chart-container");
    const legendContainer = document.getElementById("chart-legend");
    if (chartContainer && legendContainer) {
      renderEmissionsChart(filteredLogs, chartContainer, legendContainer);
    }
  }
};

// Setup filter component
const setupFilterComponent = () => {
  const activitiesSection = document.querySelector(".activities-section");
  const activitiesHeading = activitiesSection.querySelector("h2");

  const categories = getCategories();
  const filterComponent = createFilterComponent(categories, (category) => {
    selectedCategory = category;
    updateDisplay();
  });

  activitiesHeading.insertAdjacentElement("afterend", filterComponent);
};
