import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { connectMongoDB } from "../../../../db/mongoDB";
import User from "../../../../Models/userSchema/userSchema";

export async function POST(req: any) {
  try {
    const {
      name,
      email,
      password,
      role,
      selectedImage,
      reportCardStatus,
      religious,
      personalNumber,
      parentNumber,
      month,
      messMemberStatus,
      idCard,
      bloodGroup,
    } = await req.json();
    console.log(
      name,
      email,
      password,
      role,
      selectedImage,
      reportCardStatus,
      religious,
      personalNumber,
      parentNumber,
      month,
      messMemberStatus,
      idCard,
      bloodGroup
    );
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      selectedImage,
      reportCardStatus,
      religious,
      personalNumber,
      parentNumber,
      month,
      messMemberStatus,
      idCard,
      bloodGroup,
    });
    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "failed" }, { status: 201 });
  }
}
