import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { connectMongoDB } from "../../../../db/mongoDB";
import User from "../../../../Models/userSchema/userSchema";

export async function POST(req: NextResponse) {
  try {
    const { name, email, password, role } = await req.json();
    console.log(name, email, password, role);
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword, role });
    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "failed" }, { status: 201 });
  }
}
