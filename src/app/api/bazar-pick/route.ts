import { NextRequest, NextResponse } from "next/server";
import User from "../../../../Models/userSchema/userSchema";
import Manager from "../../../../Models/managerSchema/managerSchema";
import { connectMongoDB } from "../../../../db/mongoDB";

interface userInterface {
  name: string;
  email: string;
  image: string;
  validity: any;
  administrationTitle: string;
  adminMaker: string;
}

interface paramsInterface {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest) {
  const { email, validity, administrationTitle, adminMaker } =
    (await request.json()) as userInterface;
  await connectMongoDB();
  const currentAdminMaker = await User.findOne({ email: adminMaker });
  console.log(currentAdminMaker);
  if (currentAdminMaker?.role !== "superAdmin") {
    return NextResponse.json(
      { message: "Only superAdmins can assign manager" },
      { status: 404 }
    );
  }
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }
  const adminExists = await Manager.findOne({ email });
  if (!adminExists) {
    const newAdmin = await Manager.create({
      name: userExists?.name,
      email,
      image: userExists?.image,
      validity,
      administrationTitle,
      adminMaker,
    });
    return NextResponse.json(
      { message: "Admin added", newAdmin },
      { status: 201 }
    );
  }
  if (adminExists) {
    // if validity is expired, then update the validity
    // check whether validuty.endDate is less than today's date
    const expiry = new Date().getTime() > new Date(validity.endDate).getTime();
    console.log(expiry);
    if (!expiry) {
      const newValidity = await Manager.findByIdAndUpdate(adminExists._id, {
        validity,
        adminMaker,
        administrationTitle,
      });
      return NextResponse.json(
        { message: "Validity Updated", newValidity },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Admin Already Exists" },
        { status: 201 }
      );
    }
  }
}

export async function GET() {
  await connectMongoDB();
  const admin = await Manager.find();
  return NextResponse.json({ admin });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "ID parameter missing" },
      { status: 400 }
    );
  }
  try {
    await connectMongoDB();
    const deletedManager = await Manager.findByIdAndDelete(id);
    if (!deletedManager) {
      return NextResponse.json(
        { message: "Manager not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Manager deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting Manager", error },
      { status: 500 }
    );
  }
}
