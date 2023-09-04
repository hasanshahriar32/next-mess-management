import { NextResponse } from "next/server";
import ReportCard from "../../../../Models/reportCardSchema/reportCardSchema";
import { connectMongoDB } from "../../../../db/mongoDB";

export async function POST(request: any) {
  try {
    const {
      average,
      dynamicData,
      totalBazar,
      totalMeal,
      userEmail,
      month,
      homeRent,
      bills,
      image,
    } = await request.json();

    // Convert the dynamicData array into an array of dynamicDataSchema objects
    const dynamicDataArray = dynamicData.map((item: any) => ({
      name: item.name,
      total: item.total,
      personAmount: item.personAmount,
      expenseForMeal: item.expenseForMeal,
      paymentDifference: item.paymentDifference,
    }));

    // Connect to MongoDB
    await connectMongoDB();

    // Create a new report card document
    await ReportCard.create({
      average,
      month,
      dynamicData: dynamicDataArray,
      totalBazar,
      totalMeal,
      userEmail,
      homeRent,
      bills,
      image,
    });

    console.log(
      "Report card added:",
      average,
      dynamicDataArray,
      totalBazar,
      totalMeal,
      userEmail,
      month,
      homeRent,
      bills,
      image
    );

    return NextResponse.json({ message: "Report Card Added" }, { status: 201 });
  } catch (error) {
    console.error("Error adding report card:", error);
    return NextResponse.json(
      { message: "Error adding Report Card" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectMongoDB();
    const reportCard = await ReportCard.find();
    return NextResponse.json({ reportCard });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}
