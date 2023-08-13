import { NextRequest, NextResponse } from "next/server";
import Bazar from "../../../../../Models/bazarSchema/bazarSchema";
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
  const bazar = await Bazar.findOne({ _id: id });
  return NextResponse.json({ bazar });
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
    newAmount: amount,
    newBazar: bazar,
  } = await request.json();
  try {
    await connectMongoDB();
    await Bazar.findByIdAndUpdate(id, { name, email, amount, bazar });
    return NextResponse.json({ message: "Bazar Updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "not found", error }, { status: 201 });
  }
}
