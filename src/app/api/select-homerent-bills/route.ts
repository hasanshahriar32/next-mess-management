import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../db/mongoDB";
import HomeRentAndBillsModel from "../../../../Models/SelectHomeRentAndBillsSchema/SelectHomeRentAndBillsSchema";

export async function POST(req: any) {
  try {
    const arrayOfObjects = [
      {
        homeRent: 1500,
        bills: 500,
        userName: "hasan",
      },
      {
        homeRent: 1500,
        bills: 500,
        userName: "pervez",
      },
    ];
    await connectMongoDB();
    const arra = arrayOfObjects?.map(async (input: any) => {
      return await HomeRentAndBillsModel.create(input);
    });

    console.log("Data response:", arra);
    return NextResponse.json({ message: "Users Created" }, { status: 201 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Error occurred", error },
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
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}
