import { NextRequest, NextResponse } from "next/server";
import Bazar from "../../../../../Models/bazarSchema/bazarSchema";

import HomeRentAndBills from "../../../../../Models/homeRentAndBillsSchema/homeRentAndBillsSchema";
import { connectMongoDB } from "../../../../../db/mongoDB";

interface paramsInterface {
  params: {
    id: string;
  };
}

export async function GET(request: any, { params }: paramsInterface) {
  const { id } = params;
  console.log(id);
  await connectMongoDB();
  const expenses = await HomeRentAndBills.findOne({ _id: id });
  return NextResponse.json({ expenses });
}

export async function PUT(request: NextRequest, { params }: paramsInterface) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: "id Parameter Not Found" },
      { status: 201 }
    );
  }
  const {
    newName: name,
    newEmail: email,
    newHomeRent: homeRent,
    newBills: bills,
  } = await request.json();
  try {
    await connectMongoDB();
    const updateExpenses = await HomeRentAndBills.findByIdAndUpdate(id, {
      name,
      email,
      homeRent,
      bills,
    });
    console.log("Expenses Update", updateExpenses);
    return NextResponse.json(
      { message: "HomeRent And Bills Updated" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "not found", error }, { status: 201 });
  }
}

export async function PATCH(request: NextRequest, { params }: paramsInterface) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: "id Parameter Not Found" },
      { status: 201 }
    );
  }
  const { newHomeRentAndBills: homeRentAndBills } = await request.json();
  try {
    await connectMongoDB();
    const updateExpenses = await HomeRentAndBills.findByIdAndUpdate(
      id,
      {
        homeRentAndBills,
      },
      {
        new: true,
      }
    );
    console.log("Expenses Update", updateExpenses);
    return NextResponse.json(
      { message: "HomeRent And Bills Updated", updateExpenses },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "not found", error }, { status: 201 });
  }
}
