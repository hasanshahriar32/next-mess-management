import { NextResponse } from "next/server";
import HomeRentAndBills from "../../../../../../Models/homeRentAndBillsSchema/homeRentAndBillsSchema";
import { connectMongoDB } from "../../../../../../db/mongoDB";

interface paramsInterface {
  params: {
    email: string;
  };
}

export async function GET(request: any, { params }: paramsInterface) {
  const { email } = params;
  console.log(email);
  if (!email) {
    return NextResponse.json(
      { message: "id Parameter Not Found" },
      { status: 201 }
    );
  }
  try {
    await connectMongoDB();
    const expenses = await HomeRentAndBills.findOne({ email: email });
    console.log(expenses);
    return NextResponse.json({ expenses });
  } catch (error) {
    return NextResponse.json({ message: "not found", error }, { status: 201 });
  }
}
