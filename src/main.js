import { activityData } from "./activity-data";
import { showActivityForm } from "../form";

const activityLogs = [];

document
  .getElementById("add-activity-btn")
  .addEventListener("click", async () => {
    const log = await showActivityForm(activityData);
    if (log) {
      activityLogs.push(log);
      console.log("New activity:", log);
    }
  });
