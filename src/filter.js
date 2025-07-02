import { activityData } from "./activity-data.js";

export const getCategories = () => {
  return Object.keys(activityData);
};

export const filterLogsByCategory = (logs, selectedCategory) => {
  if (!selectedCategory || selectedCategory === "All") {
    return logs;
  }

  return logs.filter((log) => log.category === selectedCategory);
};

export const createFilterComponent = (categories, onFilterChange) => {
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container";

  const filterLabel = document.createElement("label");
  filterLabel.htmlFor = "category-filter";
  filterLabel.textContent = "Filter by category: ";
  filterLabel.className = "filter-label";

  const filterSelect = document.createElement("select");
  filterSelect.id = "category-filter";
  filterSelect.className = "category-filter-select";

  // Add "All" option
  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All Categories";
  filterSelect.appendChild(allOption);

  // Add category options
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterSelect.appendChild(option);
  });

  // Add change event listener
  filterSelect.addEventListener("change", (event) => {
    onFilterChange(event.target.value);
  });

  filterContainer.appendChild(filterLabel);
  filterContainer.appendChild(filterSelect);

  return filterContainer;
};
