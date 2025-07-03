# Carbon Footprint Tracker

A modern, responsive web application for tracking and visualizing personal carbon emissions across different daily activities.

## 🌱 Overview

The Carbon Footprint Tracker helps users monitor their environmental impact by logging activities across six key categories: Transport, Food, Energy, Waste, Water, and Shopping. The application provides real-time calculations, visual breakdowns, and persistent data storage to help users understand and reduce their carbon footprint.

## 📁 Project Structure

```
carbon-footprint-tracker/
├── index.html              # Main HTML file
├── form.js                 # Activity form modal logic
├── package.json            # Project dependencies
├── public/                 # Static assets
│   ├── cropped_circle_image.png
│   └── vite.svg
└── src/                    # Source code
    ├── activity-data.js    # Emissions data for activities
    ├── calculations.js     # Emission calculation functions
    ├── chart.js           # Chart rendering and visualization
    ├── counter.js         # [Not in use]
    ├── filter.js          # Category filtering logic
    ├── main.js            # Main application entry point
    ├── storage.js         # LocalStorage management
    ├── style.css          # Application styling
    └── ui.js              # UI rendering functions
```

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6 modules)
- **Build Tool**: Vite
- **Charting**: Chart.js for data visualization
- **Modals**: SweetAlert2 for user interactions
- **Styling**: CSS3 with custom properties
- **Storage**: Browser localStorage for data persistence

## 📊 Core Modules

For all the **Core Modules** and **Functions** breakdown, please refer to [API_DOCS.md](API_DOCS.md)

## 🎯 Application Flow

1. **Initialization**: Load saved activities from localStorage
2. **Display**: Render total emissions, category breakdown, and activity list
3. **User Interaction**: 
   - Add new activities via modal form
   - Delete individual activities
   - Filter activities by category
   - Clear all data
4. **Data Updates**: Automatically recalculate and re-render on changes
5. **Persistence**: Save all changes to localStorage

## 🔧 Development

### Setup
```bash
git clone https://github.com/siyabuilds/carbon-footprint-tracker
npm install
npm run dev
```

## 🎨 Styling Architecture

- **CSS Custom Properties**: Consistent color scheme and spacing
- **Flexbox/Grid**: Responsive layout system
- **Animations**: Smooth transitions and hover effects
- **Typography**: Quicksand font family for modern appearance

## 📈 Data Model

Each activity log contains:
```javascript
{
  category: "Transport",     // Activity category
  activity: "Car (10km)",    // Specific activity
  co2: 2.4,                 // CO₂ emissions in kg
  timestamp: "2025-07-03T..."  // ISO timestamp
}
```

## 🌟 Future Enhancements

- Convert this to a React app and use SCSS/Tailwind
- Implement MongoDB Functionality
- Deploy using Docker/GitHub actions.

## 🤝 Contributing

This is a project I am doing under @Umuzi-org, but suggestions and improvements are welcome through issues and pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
