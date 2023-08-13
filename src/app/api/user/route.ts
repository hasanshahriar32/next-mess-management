import { NextResponse } from "next/server";
import User from "../../../../Models/userSchema/userSchema";
import { connectMongoDB } from "../../../../db/mongoDB";
interface UserRequest {
  json: () => Promise<userInterface>;
  nextUrl: URL;
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

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function DELETE(request: UserRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "Id Perameter Missing" },
      { status: 201 }
    );
  }
  try {
    await connectMongoDB();
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ message: "User Not Found" });
    }
    return NextResponse.json({ message: "user Deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error Deleting User",
      },
      { status: 201 }
    );
  }
}
