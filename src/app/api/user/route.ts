// import { NextResponse } from "next/server";
// import User from "../../../../Models/userSchema/userSchema";
// import { connectMongoDB } from "../../../../db/mongoDB";
// interface UserRequest {
//   json: () => Promise<userInterface>;
//   nextUrl: URL;
// }
// interface userInterface {
//   name: string;
//   email: string;
// }
// export async function POST(req: UserRequest) {
//   try {
//     const { name, email } = await req.json();
//     await connectMongoDB();
//     await User.create({ name, email });
//     return NextResponse.json({ message: "User Created" }, { status: 201 });
//   } catch (error) {}
// }

// export async function GET() {
//   await connectMongoDB();
//   const users = await User.find();
//   return NextResponse.json({ users });
// }

// export async function DELETE(request: UserRequest) {
//   const id = request.nextUrl.searchParams.get("id");
//   if (!id) {
//     return NextResponse.json(
//       { message: "Id Perameter Missing" },
//       { status: 201 }
//     );
//   }
//   try {
//     await connectMongoDB();
//     const user = await User.findByIdAndDelete(id);
//     if (!user) {
//       return NextResponse.json({ message: "User Not Found" });
//     }
//     return NextResponse.json({ message: "user Deleted" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Error Deleting User",
//       },
//       { status: 201 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import User from "../../../../Models/userSchema/userSchema";
import { connectMongoDB } from "../../../../db/mongoDB";
import { NextApiRequest } from "next";

// interface UserRequest extends NextApiRequest {
//   body: userInterface;
// }
interface UserRequest {
  json: () => Promise<userInterface>;
  nextUrl: URL;
}
interface userInterface {
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function POST(req: any) {
  try {
    const { name, email, password, role } = await req.json();
    await connectMongoDB();
    await User.create({ name, email, password, role });
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  console.log("user id", id);
  if (!id) {
    return NextResponse.json(
      { message: "ID parameter missing" },
      { status: 400 }
    );
  }
  try {
    await connectMongoDB();
    const user = await User.findByIdAndDelete(id);
    console.log("Delete User", user);
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User Deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Deleting User", error },
      { status: 500 }
    );
  }
}
