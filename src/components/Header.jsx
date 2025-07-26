import { showActivityForm } from "../utils/form";
import { activityData } from "../activity-data";

const Header = ({ onActivityAdded }) => {
  const handleAddActivity = async () => {
    try {
      const result = await showActivityForm(activityData);
      if (result) {
        onActivityAdded?.(result);
      }
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>
          <i className="fa-solid fa-leaf"></i> Footprint Logger
        </h1>
        <p className="subtitle">
          Track your daily carbon emissions and reduce your impact.
        </p>
      </div>
      <button onClick={handleAddActivity} className="add-activity-btn">
        <i className="fa-solid fa-circle-plus"></i> Add Activity
      </button>
    </header>
  );
};

export default Header;
