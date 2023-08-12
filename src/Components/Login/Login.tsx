"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/app/hooks";
import { useGetPostQuery } from "@/app/features/post/postApi";

const Login = () => {
  const data = useAppSelector((state) => state.user);
  console.log(data);
  const { data: post } = useGetPostQuery({});
  console.log(post);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { status, data: session } = useSession();
  console.log(session);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All Fields Fillup Needed");
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
          <div className="text-center mb-8">
            <h2 className="mb-2 text-4xl font-semibold">Let's Get Started</h2>
            <p>Signin With Social Media</p>
            <div className="flex justify-center gap-5 mt-5">
              <FaGoogle className="text-xl  "></FaGoogle>
              <button onClick={() => signIn("github")}>
                <FiGithub className="text-xl  "></FiGithub>
              </button>
            </div>
          </div>
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
