import { NextResponse } from "next/server";
import Bazar from "../../../../../Models/bazarSchema/bazarSchema";
import { connectMongoDB } from "../../../../../db/mongoDB";

interface paramsInterface {
  params: {
    id: String;
  };
}
interface UserRequest {
  json: () => Promise<userInterface>;
}

interface userInterface {
  newName: string;
  newEmail: string;
  newAmount: number;
  newBazar: string;
}
export async function GET(request: any, { params }: paramsInterface) {
  const { id } = params;
  console.log(id);
  await connectMongoDB();
  const bazar = await Bazar.findOne({ _id: id });
  return NextResponse.json({ bazar });
}
export async function PUT(request: UserRequest, { params }: paramsInterface) {
  const { id } = params;
  const {
    newName: name,
    newEmail: email,
    newAmount: amount,
    newBazar: bazar,
  } = await request.json();
  await connectMongoDB();
  await Bazar.findByIdAndUpdate(id, { name, email, amount, bazar });
  return NextResponse.json({ message: "Bazar Updated" }, { status: 201 });
}