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

let activityLogs = loadActivityLogs();
let selectedCategory = "All";

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  setupFilterComponent();
  updateDisplay();
});

const setupEventListeners = () => {
  // Add activity button
  document
    .getElementById("add-activity-btn")
    .addEventListener("click", handleAddActivity);

  // Clear all data button
  document
    .getElementById("clear-all-btn")
    .addEventListener("click", handleClearAll);

  // Activity log delete buttons (event delegation)
  document
    .getElementById("activity-logs")
    .addEventListener("click", handleDeleteActivity);
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
