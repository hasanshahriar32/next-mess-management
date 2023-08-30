import { models, model, Schema } from "mongoose";

const mealCounSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    dayOfMonth: {
      type: Number,
      required: true,
    },
    mealNumber: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    mealYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MealCount = models.MealCount || model("MealCount", mealCounSchema);
export default MealCount;
