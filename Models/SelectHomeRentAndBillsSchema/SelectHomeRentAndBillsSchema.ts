import { Schema, model, models } from "mongoose";

const homeRentAndBillsSubSchema = new Schema({
  homeRent: Number,
  bills: Number,
  userName: String,
});

// const homeRentAndBillsSchema = new Schema({
//   arrayOfObjects: [homeRentAndBillsSubSchema],
// });

const HomeRentAndBillsModel =
  models.SelectHomeRentAndBills ||
  model("SelectHomeRentAndBills", homeRentAndBillsSubSchema);

export default HomeRentAndBillsModel;
