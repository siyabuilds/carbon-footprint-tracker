import mongoose from "mongoose";
import { activityData } from "./utils/activity-data.js";

const categoryEnum = Object.keys(activityData);
const activityEnums = {};
for (const category of categoryEnum) {
  activityEnums[category] = Object.keys(activityData[category]);
}

const activitySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: categoryEnum,
  },
  activity: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return activityEnums[this.category]?.includes(val);
      },
      message: (props) =>
        `"${props.value}" is not a valid activity for category "${props.instance.category}"`,
    },
  },
  value: {
    type: Number,
    required: true,
  },
});

// auto-fill `value` from activityData
activitySchema.pre("validate", function (next) {
  if (this.category && this.activity) {
    const correctValue = activityData[this.category][this.activity];
    if (correctValue === undefined) {
      return next(
        new Error(
          `Activity "${this.activity}" not found in category "${this.category}"`
        )
      );
    }
    this.value = correctValue;
  }
  next();
});

export const Activity = mongoose.model("Activity", activitySchema);
