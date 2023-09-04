import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../db/mongoDB";
import HomeRentAndBillsModel from "../../../../Models/SelectHomeRentAndBillsSchema/SelectHomeRentAndBillsSchema";

export async function POST(request: any) {
  try {
    const { bills, date, dayOfMonth, email, homeRent, year, user, month } =
      await request.json();

    // Convert the bills array into an array of dynamicDataSchema objects
    const billsDataArray = bills?.map((item: any) => ({
      netBill: item?.netBill,
      gasBill: item?.gasBill,
      electricityBill: item?.electricityBill,
    }));

    // Connect to MongoDB
    await connectMongoDB();

    // Create a new report card document
    await HomeRentAndBillsModel.create({
      month,
      bills: billsDataArray,
      date,
      dayOfMonth,
      email,
      homeRent,
      year,
      user,
    });

    console.log(
      "Report card added:",
      month,
      billsDataArray,
      date,
      dayOfMonth,
      email,
      homeRent,
      year,
      user
    );

    return NextResponse.json(
      { message: "Home Rent And Bills Added" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding Home Rent And Bills :", error);
    return NextResponse.json(
      { message: "Error Home Rent And Bills" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectMongoDB();
    const users = await HomeRentAndBillsModel.find();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching Home Rent And Bills", error },
      { status: 500 }
    );
  }
}
