import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../db/mongoDB";
import Admin from "../../../../../Models/adminSchema/adminSchema";
import User from "../../../../../Models/userSchema/userSchema";

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
      { message: "Only superAdmins can assign admin" },
      { status: 404 }
    );
  }
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }
  const adminExists = await Admin.findOne({ email });
  if (!adminExists) {
    const newAdmin = await Admin.create({
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
      const newValidity = await Admin.findByIdAndUpdate(adminExists._id, {
        validity,
        adminMaker,
        administrationTitle
        
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
  const admin = await Admin.find();
  return NextResponse.json({ admin });
}

export async function DELETE(
  request: NextRequest,
  { params }: paramsInterface
) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "ID parameter missing" },
      { status: 400 }
    );
  }
  try {
    await connectMongoDB();
    const expenses = await Admin.findByIdAndDelete(id);
    if (!expenses) {
      return NextResponse.json(
        { message: "Home Rent And Bazar Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Home Rent And Bazar Deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting Home Rent And Bazar", error },
      { status: 500 }
    );
  }
}
