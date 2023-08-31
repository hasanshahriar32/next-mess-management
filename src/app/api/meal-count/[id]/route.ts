import { NextResponse } from "next/server";
import MealCount from "../../../../../Models/mealCountSchema/mealCountSchema";
import { connectMongoDB } from "../../../../../db/mongoDB";
interface paramsInterface {
  params: {
    id: string;
  };
}
export async function GET(req: any, { params }: paramsInterface) {
  const { id } = params;
  console.log(id);
  if (!id) {
    return NextResponse.json(
      { message: "id Parameter Not Found" },
      { status: 400 }
    );
  }
  try {
    await connectMongoDB();
    const user = await MealCount.findOne({ _id: id });
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "Meal Not Found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "Error finding user", error },
      { status: 500 }
    );
  }
}
