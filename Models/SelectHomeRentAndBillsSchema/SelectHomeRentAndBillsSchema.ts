import { Schema, model, models } from "mongoose";

const billsSchema = new Schema({
  netBill: Number,
  gasBill: Number,
  electricityBill: Number,
});
const homeRentAndBillsSubSchema = new Schema({
  homeRent: Number,
  bills: [billsSchema],
  user: String,
  date: String,
  dayOfMonth: Number,
  email: String,
  month: String,
  year: Number,
});
const HomeRentAndBillsModel =
  models.SelectHomeRentAndBills ||
  model("SelectHomeRentAndBills", homeRentAndBillsSubSchema);

export default HomeRentAndBillsModel;
