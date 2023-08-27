import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../db/mongoDB";
import HomeRentAndBillsModel from "../../../../../Models/SelectHomeRentAndBillsSchema/SelectHomeRentAndBillsSchema";

interface paramsInterface {
  params: {
    email: string;
  };
}

// interface userInterface {
//   newName: string;
//   newEmail: string;
//   newRole: string;
//   newPassword: string;
// }

export async function GET(req: any, { params }: paramsInterface) {
  const { email } = params;
  console.log(email);
  if (!email) {
    return NextResponse.json(
      { message: "email Parameter Not Found" },
      { status: 400 }
    );
  }
  try {
    await connectMongoDB();
    const homeRentAndBills = await HomeRentAndBillsModel.findOne({
      email: email,
    });
    console.log(homeRentAndBills);
    if (!homeRentAndBills) {
      return NextResponse.json(
        { message: "Home Rent And Bills Found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ homeRentAndBills });
  } catch (error) {
    return NextResponse.json(
      { message: "Error finding Home Rent And Bills", error },
      { status: 500 }
    );
  }
}
