import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../db/mongoDB";
import MealCount from "../../../../Models/mealCountSchema/mealCountSchema";

export async function POST(request: any) {
  try {
    const { date, dayOfMonth, email, mealNumber, month, user, year } =
      await request.json();
    // Connect to MongoDB
    await connectMongoDB();
    await MealCount.create({
      date,
      dayOfMonth,
      email,
      mealNumber,
      month,
      user,
      year,
    });

    console.log(
      "Report card added:",
      date,
      dayOfMonth,
      email,
      mealNumber,
      month,
      user,
      year
    );

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
