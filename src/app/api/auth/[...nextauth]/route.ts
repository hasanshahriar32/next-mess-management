import { signIn } from "next-auth/react";
import NextAuth, { Account, User, AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "../../../../../db/mongoDB";
import UserSchema from "../../../../../Models/userSchema/userSchema";
interface CustomUser extends User {
  name: string;
  email: string;
}

interface CustomAccount extends Account {
  provider: string;
}

interface CustomSignInParams {
  user: CustomUser;
  account: CustomAccount | null; // Update the account type
}
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  //   // callbacks: {
  //   //   async signIn(params) {
  //   //     const { user, account } = params;
  //   //     const customUser = user as CustomUser;
  //   //     if (account && account.provider === "google") {
  //   //       const { name, email } = customUser;
  //   //       try {
  //   //         await connectMongoDB();
  //   //         const userExists = await UserSchema.findOne({ email });
  //   //         if (!userExists) {
  //   //           const res = await fetch("http://localhost:3000/api/googleUser", {
  //   //             method: "POST",
  //   //             headers: {
  //   //               "content-type": "application/json",
  //   //             },
  //   //             body: JSON.stringify({ name, email }),
  //   //           });
  //   //           if (res.ok) {
  //   //             return customUser; // Return the customUser object
  //   //           }
  //   //         }
  //   //         return customUser; // Return the customUser object
  //   //       } catch (error) {
  //   //         console.log(error);
  //   //       }
  //   //     }
  //   //   },
  //   // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
