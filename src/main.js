import { activityData } from "./activity-data";
import { showActivityForm } from "../form";
import { saveActivityLogs, loadActivityLogs } from "./storage";
import { calculateTotalEmissions } from "./calculations";
import {
  renderActivityLogs,
  renderTotalEmissions,
  renderCategoryBreakdown,
  confirmDeleteActivity,
  confirmClearAllActivities,
} from "./ui";

let activityLogs = loadActivityLogs();

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
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

  renderActivityLogs(activityLogs, document.getElementById("activity-logs"));
  renderCategoryBreakdown(
    activityLogs,
    document.getElementById("category-breakdown")
  );
};
