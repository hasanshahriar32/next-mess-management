import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../db/mongoDB";
import User from "../../../../../../Models/userSchema/userSchema";

interface paramsInterface {
  params: {
    // email: string;
    id: string;
    email: string;
  };
}

interface userInterface {
  newRole: string;
}

export async function PATCH(req: any, { params }: paramsInterface) {
  const { id } = params;
  const { newReportCardStatus } = await req.json();
  if (!id) {
    return NextResponse.json(
      { message: "id Parameter Not Found" },
      { status: 400 }
    );
  }
  try {
    await connectMongoDB();
    const userUpdate = await User.findByIdAndUpdate(
      id,
      {
        reportCardStatus: newReportCardStatus,
      },
      { new: true }
    );

    console.log("updated user", userUpdate);
    if (!userUpdate) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User Updated", userUpdate });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}
