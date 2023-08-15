import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../db/mongoDB";
import Schedule from "../../../../Models/scheduleSchema/scheduleSchema";

interface scheduleInterface {
  name: string;
  email: string;
  schedule: string;
  details: string;
  title: string;
  image: string;
}

export async function POST(request: NextRequest) {
  const { name, email, schedule, details, title, image } =
    (await request.json()) as scheduleInterface;
  await connectMongoDB();
  await Schedule.create({ name, email, schedule, details, title, image });
  return NextResponse.json({ message: "Schedule Added" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const schedules = await Schedule.find();
  return NextResponse.json({ schedules });
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
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return NextResponse.json(
        { message: "Schedule not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Schedule deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting schedule", error },
      { status: 500 }
    );
  }
}
