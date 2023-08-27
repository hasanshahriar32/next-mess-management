import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../db/mongoDB";
import HomeRentAndBills from "../../../../Models/homeRentAndBillsSchema/homeRentAndBillsSchema";

interface userInterface {
  name: string;
  email: string;
  homeRent: number;
  bills: string;
  month: string;
  homeRentAndBills: boolean;
  homeRentDate: String;
  dayOfMonth: Number;
  year: Number;
}

interface paramsInterface {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest) {
  const {
    name,
    homeRentDate,
    dayOfMonth,
    year,
    email,
    homeRent,
    bills,
    month,
    homeRentAndBills,
  } = (await request.json()) as userInterface;
  await connectMongoDB();
  await HomeRentAndBills.create({
    name,
    email,
    homeRent,
    bills,
    month,
    homeRentAndBills,
    homeRentDate,
    dayOfMonth,
    year,
  });
  console.log(
    name,
    email,
    homeRent,
    bills,
    month,
    homeRentAndBills,
    homeRentDate,
    dayOfMonth,
    year
  );
  return NextResponse.json(
    { message: "HomeRent And Bills Added" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const expenses = await HomeRentAndBills.find();
  return NextResponse.json({ expenses });
}

export async function DELETE(
  request: NextRequest,
  { params }: paramsInterface
) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "ID parameter missing" },
      { status: 400 }
    );
  }
  try {
    await connectMongoDB();
    const expenses = await HomeRentAndBills.findByIdAndDelete(id);
    if (!expenses) {
      return NextResponse.json(
        { message: "Home Rent And Bazar Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Home Rent And Bazar Deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting Home Rent And Bazar", error },
      { status: 500 }
    );
  }
}
