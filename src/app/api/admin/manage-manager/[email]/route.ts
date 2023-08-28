import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { connectMongoDB } from "../../../../../../db/mongoDB";
import Manager from "../../../../../../Models/managerSchema/managerSchema";
import User from "../../../../../../Models/userSchema/userSchema";

interface paramsInterface {
  params: {
    email: string;
  };
}

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
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    const manager = await Manager.findOne({ email: email });
    console.log(manager);
    if (!manager) {
      return NextResponse.json(
        { message: "manager Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ manager });
  } catch (error) {
    return NextResponse.json(
      { message: "Error finding manager", error },
      { status: 500 }
    );
  }
}
