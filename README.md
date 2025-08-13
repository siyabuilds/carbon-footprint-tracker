# Carbon Footprint Tracker

A modern, responsive web application for tracking and visualizing personal carbon emissions across different daily activities.

## 🌱 Overview

The Carbon Footprint Tracker helps users monitor their environmental impact by logging activities across six key categories: Transport, Food, Energy, Waste, Water, and Shopping. The application provides real-time calculations, visual breakdowns, and persistent data storage to help users understand and reduce their carbon footprint.

## 📁 Project Structure

```
carbon-footprint-tracker/
├── README.md               # Project documentation
├── vercel.json            # Deployment configuration
├── client/                # Frontend application
│   ├── index.html         # Main HTML file
│   ├── package.json       # Frontend dependencies
│   ├── Dockerfile         # Client containerization
│   ├── API_DOCS.md        # API documentation
│   ├── LICENSE            # License file
│   ├── public/            # Static assets
│   │   ├── cropped_circle_image.png
│   │   └── vite.svg
│   └── src/               # Frontend source code
│       ├── activity-data.js    # Emissions data for activities
│       ├── calculations.js     # Emission calculation functions
│       ├── chart.js           # Chart rendering and visualization
│       ├── filter.js          # Category filtering logic
│       ├── form.js            # Activity form modal logic
│       ├── main.js            # Main application entry point
│       ├── storage.js         # LocalStorage management
│       ├── style.css          # Application styling
│       ├── ui.js              # UI rendering functions
│       └── javascript.svg     # JavaScript icon
└── server/                # Backend application
    ├── package.json       # Backend dependencies
    ├── data/              # Data storage
    │   └── users.json     # User data
    ├── db/                # Database configuration
    │   └── connect.js     # Database connection
    └── src/               # Backend source code
        ├── index.js       # Server entry point
        ├── middleware/    # Custom middleware
        │   └── auth.js    # Authentication middleware
        ├── models/        # Data models
        └── routes/        # API routes
            ├── login.js   # Login endpoints
            └── register.js # Registration endpoints
```

## 🛠️ Technical Stack

### Frontend
- **Framework**: Vanilla JavaScript (ES6 modules)
- **Build Tool**: Vite
- **Charting**: Chart.js for data visualization
- **Modals**: SweetAlert2 for user interactions
- **Styling**: CSS3 with custom properties
- **Storage**: Browser localStorage for data persistence

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT middleware
- **Database**: Connection utilities for future database integration

## 📊 Core Modules

For all the **Core Modules** and **Functions** breakdown, please refer to [client/API_DOCS.md](client/API_DOCS.md)

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
cd carbon-footprint-tracker

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Run the client (frontend)
cd ../client
npm run dev

# Run the server (backend) - in a separate terminal
cd ../server
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

This is a project I am doing under [Umuzi](https://github.com/Umuzi-org), but suggestions and improvements are welcome through issues and pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
