import { models, model, Schema } from "mongoose";

const scheduleSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = models.schedule || model("schedule", scheduleSchema);
export default Schedule;
