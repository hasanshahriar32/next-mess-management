// import { NextResponse } from "next/server";
// import Bazar from "../../../../../Models/bazarSchema/bazarSchema";
// import { connectMongoDB } from "../../../../../db/mongoDB";

// interface paramsInterface {
//   params: {
//     id: String;
//   };
// }
// interface UserRequest {
//   json: () => Promise<userInterface>;
// }

// interface userInterface {
//   newName: string;
//   newEmail: string;
//   newAmount: number;
//   newBazar: string;
// }
// export async function GET(request: any, { params }: paramsInterface) {
//   const { id } = params;
//   console.log(id);
//   await connectMongoDB();
//   const bazar = await Bazar.findOne({ _id: id });
//   return NextResponse.json({ bazar });
// }
// export async function PUT(request: UserRequest, { params }: paramsInterface) {
//   const { id } = params;
//   if (!id) {
//     return NextResponse.json(
//       { message: "id Perameter Not Found" },
//       { status: 201 }
//     );
//   }
//   const {
//     newName: name,
//     newEmail: email,
//     newAmount: amount,
//     newBazar: bazar,
//   } = await request.json();
//   try {
//     await connectMongoDB();
//     await Bazar.findByIdAndUpdate(id, { name, email, amount, bazar });
//     return NextResponse.json({ message: "Bazar Updated" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "not found", error }, { status: 201 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import Bazar from "../../../../../Models/bazarSchema/bazarSchema";
import { connectMongoDB } from "../../../../../db/mongoDB";

interface paramsInterface {
  params: {
    id: string;
  };
}

export async function GET(request: any, { params }: paramsInterface) {
  const { id } = params;

  await connectMongoDB();
  const bazar = await Bazar.findOne({ _id: id });
  return NextResponse.json({ bazar });
}

export async function PATCH(request: NextRequest, { params }: paramsInterface) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: "id Parameter Not Found" },
      { status: 201 }
    );
  }
  const { newBazarStatus: bazarStatus } = await request.json();
  console.log(bazarStatus);
  try {
    await connectMongoDB();
    const updatedBazars = await Bazar.findByIdAndUpdate(
      id,
      {
        bazarStatus,
      },
      {
        new: true,
      }
    );
    console.log("updated  bazar", updatedBazars);
    return NextResponse.json(
      { message: "Bazar Updated", updatedBazars },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "not found", error }, { status: 201 });
  }
}
export async function PUT(request: NextRequest, { params }: paramsInterface) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: "id Parameter Not Found" },
      { status: 201 }
    );
  }
  const {
    newBazarStatus: bazarStatus,
    newName: name,
    newEmail: email,
    newMonth: month,
    newBazar: bazar,
    newAmount: amount,
  } = await request.json();
  console.log(bazarStatus, name, email, month, bazar, amount);
  try {
    await connectMongoDB();
    const updatedBazars = await Bazar.findByIdAndUpdate(id, {
      bazarStatus,
      name,
      email,
      month,
      bazar,
      amount,
    });
    console.log("updated  bazar", updatedBazars);
    return NextResponse.json(
      { message: "Bazar Updated", updatedBazars },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "not found", error }, { status: 201 });
  }
}
