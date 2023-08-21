import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "../../../../../db/mongoDB";
import User from "../../../../../Models/userSchema/userSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        console.log("from credentials", credentials);
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          console.log(user);
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user?.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_SECRET,
  pages: {
    signin: "/login",
  },
};

const handle = NextAuth(authOptions);
export { handle as GET, handle as POST };
