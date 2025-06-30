// Calculations for carbon footprint tracking
export const calculateTotalEmissions = (logs) => {
  return logs.reduce((total, log) => total + log.co2, 0);
};

export const calculateEmissionsByCategory = (logs) => {
  const categoryTotals = {};

  logs.forEach((log) => {
    categoryTotals[log.category] =
      (categoryTotals[log.category] || 0) + log.co2;
  });

  return categoryTotals;
};

export const formatEmissions = (value) => {
  return `${value.toFixed(2)} kg CO₂`;
};
