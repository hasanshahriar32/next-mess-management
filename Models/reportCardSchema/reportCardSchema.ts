import { Schema, model, models } from "mongoose";
const dynamicDataSchema = new Schema({
  name: String,
  total: Number,
  personAmount: Number,
  expenseForMeal: Number,
  paymentDifference: Number,
});
const averageSchema = new Schema(
  {
    average: Number,
    dynamicData: [dynamicDataSchema],
    totalBazar: Number,
    totalMeal: Number,
    userEmail: String,
    month: String,
    homeRent: Number,
    bills: Number,
    image: String,
  },
  {
    timestamps: true,
  }
);

const ReportCard = models.reportCard || model("reportCard", averageSchema);
export default ReportCard;
