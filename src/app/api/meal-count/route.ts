import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../db/mongoDB";
import MealCount from "../../../../Models/mealCountSchema/mealCountSchema";

export async function POST(request: any) {
  try {
    const { date, dayOfMonth, email, mealNumber, month, user, mealYear } =
      await request.json();
    console.log(
      "before added:",
      date,
      dayOfMonth,
      email,
      mealNumber,
      month,
      user,
      mealYear
    );

    // Connect to MongoDB
    await connectMongoDB();
    const meal = await MealCount.create({
      date,
      dayOfMonth,
      email,
      mealNumber,
      month,
      user,
      mealYear,
    });

    console.log("Meal Count Add added:", meal);

    return NextResponse.json({ message: "Meal Added" }, { status: 201 });
  } catch (error) {
    console.error("Error adding Meal :", error);
    return NextResponse.json({ message: "Error adding Meal" }, { status: 500 });
  }
}
export async function GET() {
  try {
    await connectMongoDB();
    const mealCount = await MealCount.find();
    return NextResponse.json({ mealCount });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching Meals", error },
      { status: 500 }
    );
  }
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
    const deletedBazar = await MealCount.findByIdAndDelete(id);
    if (!deletedBazar) {
      return NextResponse.json({ message: "Bazar not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Bazar deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting bazar", error },
      { status: 500 }
    );
  }
}
