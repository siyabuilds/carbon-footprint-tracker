# API Documentation

## 📋 Function Reference

### Main Application (`main.js`)

#### `setupEventListeners()`
Sets up all DOM event listeners for the application.
- **Parameters**: None
- **Returns**: `void`
- **Side Effects**: Binds click events to buttons and activity logs

#### `setupFilterComponent()`
Creates and inserts the category filter component into the DOM.
- **Parameters**: None
- **Returns**: `void`
- **Side Effects**: Modifies DOM structure

#### `updateDisplay()`
Updates all UI components with current data and filters.
- **Parameters**: None
- **Returns**: `void`
- **Side Effects**: Re-renders all UI components

#### `handleAddActivity()`
Handles the add activity button click event.
- **Parameters**: None
- **Returns**: `Promise<void>`
- **Side Effects**: Shows modal, updates activity logs, saves to storage

#### `handleDeleteActivity(event)`
Handles delete button clicks using event delegation.
- **Parameters**: 
  - `event`: `Event` - The click event
- **Returns**: `Promise<void>`
- **Side Effects**: Removes activity from logs, updates storage

#### `handleClearAll()`
Handles the clear all data button click.
- **Parameters**: None
- **Returns**: `Promise<void>`
- **Side Effects**: Clears all activity logs, updates storage

---

### Activity Data (`activity-data.js`)

#### `activityData`
Object containing emission factors for all activities.
- **Type**: `Object`
- **Structure**:
```javascript
{
  [categoryName]: {
    [activityName]: number // CO₂ emissions in kg
  }
}
```

---

### Calculations (`calculations.js`)

#### `calculateTotalEmissions(logs)`
Calculates total CO₂ emissions from activity logs.
- **Parameters**:
  - `logs`: `Array<ActivityLog>` - Array of activity logs
- **Returns**: `number` - Total emissions in kg CO₂
- **Example**:
```javascript
const total = calculateTotalEmissions([
  { co2: 2.4, category: "Transport", activity: "Car" },
  { co2: 1.5, category: "Food", activity: "Chicken" }
]);
// Returns: 3.9
```

#### `calculateEmissionsByCategory(logs)`
Groups emissions by category.
- **Parameters**:
  - `logs`: `Array<ActivityLog>` - Array of activity logs
- **Returns**: `Object` - Object with category totals
- **Example**:
```javascript
const breakdown = calculateEmissionsByCategory(logs);
// Returns: { "Transport": 2.4, "Food": 1.5 }
```

#### `formatEmissions(value)`
Formats emission values for display.
- **Parameters**:
  - `value`: `number` - Emission value in kg
- **Returns**: `string` - Formatted string
- **Example**:
```javascript
formatEmissions(2.456); // Returns: "2.46 kg CO₂"
```

---

### Storage (`storage.js`)

#### `saveActivityLogs(logs)`
Saves activity logs to localStorage.
- **Parameters**:
  - `logs`: `Array<ActivityLog>` - Array of activity logs
- **Returns**: `void`
- **Side Effects**: Updates localStorage
- **Error Handling**: Logs errors to console

#### `loadActivityLogs()`
Loads activity logs from localStorage.
- **Parameters**: None
- **Returns**: `Array<ActivityLog>` - Array of activity logs (empty if none)
- **Error Handling**: Returns empty array on error

#### `clearActivityLogs()`
Clears all activity logs from localStorage.
- **Parameters**: None
- **Returns**: `void`
- **Side Effects**: Removes data from localStorage

---

### UI Rendering (`ui.js`)

#### `createActivityLogElement(log, index)`
Creates a DOM element for an activity log.
- **Parameters**:
  - `log`: `ActivityLog` - Activity log object
  - `index`: `number` - Array index for deletion
- **Returns**: `HTMLElement` - DOM element
- **Structure**:
```html
<div class="activity-log-item">
  <div class="activity-info">...</div>
  <div class="activity-emissions">...</div>
</div>
```

#### `renderActivityLogs(logs, container)`
Renders activity logs in the specified container.
- **Parameters**:
  - `logs`: `Array<ActivityLog>` - Filtered activity logs
  - `container`: `HTMLElement` - Container element
- **Returns**: `void`
- **Side Effects**: Updates DOM content

#### `renderTotalEmissions(totalEmissions, container)`
Updates the total emissions display.
- **Parameters**:
  - `totalEmissions`: `number` - Total emissions value
  - `container`: `HTMLElement` - Container element
- **Returns**: `void`
- **Side Effects**: Updates DOM content

#### `renderCategoryBreakdown(logs, container)`
Renders emissions breakdown by category.
- **Parameters**:
  - `logs`: `Array<ActivityLog>` - Activity logs
  - `container`: `HTMLElement` - Container element
- **Returns**: `void`
- **Side Effects**: Updates DOM content

#### `confirmDeleteActivity(activityName)`
Shows confirmation dialog for activity deletion.
- **Parameters**:
  - `activityName`: `string` - Name of activity to delete
- **Returns**: `Promise<boolean>` - User confirmation result
- **Library**: Uses SweetAlert2

#### `confirmClearAllActivities()`
Shows confirmation dialog for clearing all data.
- **Parameters**: None
- **Returns**: `Promise<boolean>` - User confirmation result
- **Library**: Uses SweetAlert2

---

### Chart Visualization (`chart.js`)

#### `renderEmissionsChart(logs, chartContainer, legendContainer)`
Renders a doughnut chart showing emissions breakdown.
- **Parameters**:
  - `logs`: `Array<ActivityLog>` - Activity logs for chart
  - `chartContainer`: `HTMLElement` - Chart canvas container
  - `legendContainer`: `HTMLElement` - Legend container
- **Returns**: `void`
- **Side Effects**: Creates/updates Chart.js instance

#### `renderCustomLegend(categoryTotals, legendContainer)`
Renders a custom legend for the chart.
- **Parameters**:
  - `categoryTotals`: `Object` - Category emission totals
  - `legendContainer`: `HTMLElement` - Legend container
- **Returns**: `void`
- **Side Effects**: Updates DOM content

#### `renderNoDataMessage(chartContainer, legendContainer)`
Displays message when no data is available.
- **Parameters**:
  - `chartContainer`: `HTMLElement` - Chart container
  - `legendContainer`: `HTMLElement` - Legend container
- **Returns**: `void`
- **Side Effects**: Clears chart and shows message

#### `CATEGORY_COLORS`
Object mapping categories to their display colors.
- **Type**: `Object`
- **Structure**:
```javascript
{
  Transport: "#2196f3",
  Food: "#ff9800",
  Energy: "#9c27b0",
  // ...
}
```

---

### Filtering (`filter.js`)

#### `getCategories()`
Extracts available categories from activity data.
- **Parameters**: None
- **Returns**: `Array<string>` - Array of category names
- **Example**:
```javascript
getCategories(); // Returns: ["Transport", "Food", "Energy", ...]
```

#### `filterLogsByCategory(logs, selectedCategory)`
Filters activity logs by selected category.
- **Parameters**:
  - `logs`: `Array<ActivityLog>` - All activity logs
  - `selectedCategory`: `string` - Category to filter by ("All" for no filter)
- **Returns**: `Array<ActivityLog>` - Filtered logs
- **Example**:
```javascript
const filtered = filterLogsByCategory(logs, "Transport");
// Returns only transport activities
```

#### `createFilterComponent(categories, onFilterChange)`
Creates a filter dropdown component.
- **Parameters**:
  - `categories`: `Array<string>` - Available categories
  - `onFilterChange`: `Function` - Callback for filter changes
- **Returns**: `HTMLElement` - Filter component
- **Callback Signature**: `(selectedCategory: string) => void`

---

### Form Management (`form.js`)

#### `showActivityForm(activityData)`
Shows the activity input form modal.
- **Parameters**:
  - `activityData`: `Object` - Activity data with emission factors
- **Returns**: `Promise<ActivityLog|null>` - Activity log or null if cancelled
- **Library**: Uses SweetAlert2
- **Example**:
```javascript
const activity = await showActivityForm(activityData);
if (activity) {
  // User submitted form
  console.log(activity); // { category, activity, co2 }
}
```

#### `generateCategoryOptions(activityData)`
Generates HTML options for category dropdown.
- **Parameters**:
  - `activityData`: `Object` - Activity data
- **Returns**: `string` - HTML option elements
- **Private Function**: Internal use only

#### `setupCategoryChangeHandler(catSelect, actSelect, activityData)`
Sets up category dropdown change handler.
- **Parameters**:
  - `catSelect`: `HTMLSelectElement` - Category select element
  - `actSelect`: `HTMLSelectElement` - Activity select element
  - `activityData`: `Object` - Activity data
- **Returns**: `void`
- **Private Function**: Internal use only

#### `getFormHTML(categoryOptions)`
Generates HTML for the activity form.
- **Parameters**:
  - `categoryOptions`: `string` - HTML option elements
- **Returns**: `string` - Complete form HTML
- **Private Function**: Internal use only

---

## 🔧 Data Types

### `ActivityLog`
Represents a single activity log entry.
```javascript
{
  category: string,    // Activity category (e.g., "Transport")
  activity: string,    // Specific activity (e.g., "Car (10km)")
  co2: number,         // CO₂ emissions in kg
  timestamp: string    // ISO timestamp string
}
```

### `CategoryTotals`
Object mapping categories to their total emissions.
```javascript
{
  [categoryName]: number // Total emissions for category
}
```

### `EmissionFactor`
Represents the CO₂ emission factor for an activity.
```javascript
number // CO₂ emissions in kg per activity unit
```

---

## 🎯 Usage Examples

### Adding a New Activity Programmatically
```javascript
// Create activity log
const newActivity = {
  category: "Transport",
  activity: "Car (10km)",
  co2: 2.4,
  timestamp: new Date().toISOString()
};

// Add to logs
activityLogs.push(newActivity);

// Save and update display
saveActivityLogs(activityLogs);
updateDisplay();
```

### Filtering Activities
```javascript
// Get all transport activities
const transportLogs = filterLogsByCategory(activityLogs, "Transport");

// Get all activities (no filter)
const allLogs = filterLogsByCategory(activityLogs, "All");
```

### Calculating Emissions
```javascript
// Total emissions
const total = calculateTotalEmissions(activityLogs);

// Emissions by category
const breakdown = calculateEmissionsByCategory(activityLogs);
console.log(breakdown);
// { "Transport": 5.2, "Food": 3.8, "Energy": 2.1 }
```

### Working with the Chart
```javascript
// Render chart with current data
const chartContainer = document.querySelector('.chart-container');
const legendContainer = document.getElementById('chart-legend');
renderEmissionsChart(activityLogs, chartContainer, legendContainer);

// Access chart instance
if (chartInstance) {
  chartInstance.destroy(); // Clean up
}
```

---

## 🔄 Event System

### DOM Events
- `click` on `#add-activity-btn` → `handleAddActivity()`
- `click` on `#clear-all-btn` → `handleClearAll()`
- `click` on `.delete-btn` → `handleDeleteActivity()`
- `change` on category filter → filter update