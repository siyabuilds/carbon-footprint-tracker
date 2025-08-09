import {
  calculateEmissionsByCategory,
  formatEmissions,
} from "./calculations.js";
import Chart from "chart.js/auto";

const CATEGORY_COLORS = {
  Transport: "#2196f3",
  Food: "#ff9800",
  Energy: "#9c27b0",
  Waste: "#795548",
  Water: "#00bcd4",
  Shopping: "#e91e63",
};

let chartInstance = null;

export const renderEmissionsChart = (logs, chartContainer, legendContainer) => {
  if (logs.length === 0) {
    renderNoDataMessage(chartContainer, legendContainer);
    return;
  }

  const categoryTotals = calculateEmissionsByCategory(logs);
  const categories = Object.keys(categoryTotals);

  if (categories.length === 0) {
    renderNoDataMessage(chartContainer, legendContainer);
    return;
  }

  // Prepare data for Chart.js
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map((category) => categoryTotals[category]),
        backgroundColor: categories.map(
          (category) => CATEGORY_COLORS[category]
        ),
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false, // Create custom legend instead
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const category = context.label;
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${category}: ${formatEmissions(value)} (${percentage}%)`;
            },
          },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          borderColor: "#4caf50",
          borderWidth: 1,
        },
      },
      animation: {
        animateRotate: true,
        duration: 1000,
      },
    },
  };

  // Get canvas element
  const canvas = chartContainer.querySelector("#emissions-chart");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvas, config);
  renderCustomLegend(categoryTotals, legendContainer);
};

const renderCustomLegend = (categoryTotals, legendContainer) => {
  const total = Object.values(categoryTotals).reduce(
    (sum, value) => sum + value,
    0
  );

  const legendHTML = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([category, value]) => {
      const percentage = ((value / total) * 100).toFixed(1);
      return `
        <div class="legend-item">
          <div class="legend-color" style="background-color: ${
            CATEGORY_COLORS[category]
          }"></div>
          <span class="legend-label">${category}</span>
          <span class="legend-value">${formatEmissions(
            value
          )} (${percentage}%)</span>
        </div>
      `;
    })
    .join("");

  legendContainer.innerHTML = legendHTML;
};

const renderNoDataMessage = (chartContainer, legendContainer) => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  const canvas = chartContainer.querySelector("#emissions-chart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Show no data message
  legendContainer.innerHTML = `
    <div class="no-data-message">
      <i class="fa-solid fa-chart-pie"></i>
      <p>No emissions data available. Start logging activities to see your breakdown!</p>
    </div>
  `;
};

export { CATEGORY_COLORS };
