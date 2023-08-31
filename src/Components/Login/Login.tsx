"use client";
import { useAppSelector } from "@/app/hooks";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

import {
  useGetBazarQuery,
  useGetSingleUserQuery,
} from "@/app/features/bazar/bazarApi";

const Login = () => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  console.log("Google Client ID (Client-side):", googleClientId);
  const data = useAppSelector((state) => state.user);
  console.log(data);
  const { status, data: session } = useSession();
  console.log(session);
  const sessionEmail: any = session?.user?.email ?? "";
  console.log(sessionEmail);
  const { data: singleUserData, isError: userQueryError } =
    useGetSingleUserQuery(sessionEmail);
  console.log(singleUserData);

  const { data: allBazar } = useGetBazarQuery();
  console.log(allBazar);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All Fields Fillup Needed");
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
      });
      console.log("Sign In Response:", res);

      // if (res.error) {
      //   setError("Invalid credentials");
      //   return;
      // }

      // If sign-in is successful, navigate to the profile page
      // router.replace("/profile");
    } catch (error) {
      console.error("Sign In Error:", error);
      setError("An error occurred while signing in");
    }
  };
  // Navigate to the about page
  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className=" w-5/6 grid grid-cols-2 gap-32 justify-between items-center ">
        <div>
          {/* <div className="text-center mb-8">
            <h2 className="mb-2 text-4xl font-semibold">Let's Get Started</h2>
            <p>Signin With Social Media</p>
            <div className="flex justify-center gap-5 mt-5">
              <button onClick={() => signIn("google")}>
                {" "}
                <FaGoogle className="text-xl  "></FaGoogle>
              </button>
              <button onClick={() => signIn("github")}>
                <FiGithub className="text-xl  "></FiGithub>
              </button>
            </div>
          </div> */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="border-2 mb-5 border-gray-200 px-4 py-2 rounded-lg w-full"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="border-2 mb-5 border-gray-200 px-4 py-2 rounded-lg w-full"
            />
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-white rounded-lg">
              Login
            </button>
            {error && (
              <div>
                <p className="bg-red-600 px-6 py-3 my-5 text-white">{error}</p>
              </div>
            )}
          </form>
          <div className="  text-end mt-5 ">
            <Link href="/signup">Have An Account ? Signup Here</Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-screen flex items-center justify-center">
          <div>
            <h2 className="text-4xl mb-3 font-semibold">
              Welcome To Login Page
            </h2>
            <p className="mb-2">Stay Connected With Us</p>
            <p className="mb-2">Please Login With Your Personal Info</p>
            <div className="mt-5">
              <Link href={"/"}>
                <span className="text-black  font-semibold bg-white px-6 py-3 rounded-lg">
                  Go To Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
