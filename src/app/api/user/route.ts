import { NextResponse } from "next/server";
import User from "../../../../Models/userSchema/userSchema";
import { connectMongoDB } from "../../../../db/mongoDB";
interface UserRequest {
  json: () => Promise<userInterface>;
}
interface userInterface {
  name: string;
  email: string;
}
export async function POST(req: UserRequest) {
  try {
    const { name, email } = await req.json();
    await connectMongoDB();
    await User.create({ name, email });
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {}
}
