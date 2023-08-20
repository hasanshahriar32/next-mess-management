// import { NextResponse } from "next/server";
// import User from "../../../../../Models/userSchema/userSchema";
// import { connectMongoDB } from "../../../../../db/mongoDB";

// interface paramsInterface {
//   params: {
//     id: string;
//   };
// }

// interface UserRequest {
//   json: () => Promise<userInterface>;
// }

// interface userInterface {
//   newName: string;
//   newEmail: string;
// }

// export async function GET(request: UserRequest, { params }: paramsInterface) {
//   const { id } = params;
//   if (!id) {
//     return NextResponse.json(
//       { message: "id Perameter Not Found" },
//       { status: 201 }
//     );
//   }
//   try {
//     await connectMongoDB();
//     const user = await User.findOne({ _id: id });
//     if (!user) {
//       return NextResponse.json(
//         { message: "User Didn't Found" },
//         { status: 201 }
//       );
//     }
//     return NextResponse.json({ user });
//   } catch (error) {
//     return NextResponse.json({ message: "User Not Found" }, { status: 201 });
//   }
// }

// export async function PUT(request: UserRequest, { params }: paramsInterface) {
//   const { id } = params;
//   const { newName: name, newEmail: email } = await request.json();
//   if (!id) {
//     return NextResponse.json(
//       { message: "id Perameter Not Found" },
//       { status: 201 }
//     );
//   }

//   try {
//     await connectMongoDB();
//     const userUpdate = await User.findByIdAndUpdate(id, { name, email });

//     if (!userUpdate) {
//       return NextResponse.json(
//         { message: "User Didn't Found" },
//         { status: 201 }
//       );
//     }
//     return NextResponse.json({ message: "User Updated" });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "User not found", error },
//       { status: 201 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import User from "../../../../../Models/userSchema/userSchema";
import { connectMongoDB } from "../../../../../db/mongoDB";
import { NextApiRequest } from "next";

interface paramsInterface {
  params: {
    email: string;
  };
}

// interface userInterface {
//   newName: string;
//   newEmail: string;
//   newRole: string;
//   newPassword: string;
// }

export async function GET(req: any, { params }: paramsInterface) {
  const { email } = params;
  console.log(email);
  if (!email) {
    return NextResponse.json(
      { message: "email Parameter Not Found" },
      { status: 400 }
    );
  }
  try {
    await connectMongoDB();
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "Error finding user", error },
      { status: 500 }
    );
  }
}

// export async function PUT(req: NextApiRequest, { params }: paramsInterface) {
//   const { id } = params;
//   const {
//     newName: name,
//     newEmail: email,
//     newRole: role,
//     newPassword: password,
//   }: userInterface = req.body;
//   if (!id) {
//     return NextResponse.json(
//       { message: "id Parameter Not Found" },
//       { status: 400 }
//     );
//   }

//   try {
//     await connectMongoDB();
//     const userUpdate = await User.findByIdAndUpdate(id, {
//       name,
//       email,
//       password,
//       role,
//     });

//     if (!userUpdate) {
//       return NextResponse.json({ message: "User Not Found" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "User Updated" });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error updating user", error },
//       { status: 500 }
//     );
//   }
// }
