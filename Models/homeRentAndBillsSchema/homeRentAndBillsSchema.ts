import { models, model, Schema } from "mongoose";

const bazarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    homeRent: {
      type: Number,
      required: true,
    },
    bills: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HomeRentAndBills =
  models.homeAndBill || model("homeAndBill", bazarSchema);
export default HomeRentAndBills;
