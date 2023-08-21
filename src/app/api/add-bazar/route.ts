// import { NextResponse } from "next/server";
// import Bazar from "../../../../Models/bazarSchema/bazarSchema";
// import { connectMongoDB } from "../../../../db/mongoDB";

// interface UserRequest {
//   json: () => Promise<userInterface>;
//   nextUrl: URL;
// }
// interface userInterface {
//   name: string;
//   email: string;
//   amount: number;
//   bazar: string;
// }

// export async function POST(request: UserRequest) {
//   const { name, email, amount, bazar } = await request.json();
//   await connectMongoDB();
//   await Bazar.create({ name, email, amount, bazar });
//   return NextResponse.json({ message: "Bazar Added" }, { status: 201 });
// }

// export async function GET() {
//   await connectMongoDB();
//   const bazars = await Bazar.find();
//   return NextResponse.json({ bazars });
// }

// export async function DELETE(request: UserRequest) {
//   const id = request.nextUrl.searchParams.get("id");
//   if (!id) {
//     return NextResponse.json(
//       { message: "ID parameter missing" },
//       { status: 400 }
//     );
//   }
//   try {
//     await connectMongoDB();
//     const deletedBazar = await Bazar.findByIdAndDelete(id);
//     if (!deletedBazar) {
//       return NextResponse.json({ message: "Bazar not found" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "Bazar deleted" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error deleting bazar", error },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import Bazar from "../../../../Models/bazarSchema/bazarSchema";
import { connectMongoDB } from "../../../../db/mongoDB";

interface userInterface {
  name: string;
  email: string;
  amount: number;
  bazar: string;
  month: string;
}

export async function POST(request: any) {
  const { name, email, amount, bazar, month, bazarStatus } =
    await request.json();
  await connectMongoDB();
  await Bazar.create({ name, email, amount, bazar, month, bazarStatus });
  console.log("from add bazar", name, email, amount, month, bazar, bazarStatus);
  return NextResponse.json({ message: "Bazar Added" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const bazars = await Bazar.find();
  return NextResponse.json({ bazars });
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
    const deletedBazar = await Bazar.findByIdAndDelete(id);
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
