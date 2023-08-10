"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All Fields Fillup Needed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className=" w-5/6 mx-auto grid grid-cols-2 gap-32 justify-between items-center ">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-screen flex items-center justify-center">
          <div>
            <h2 className="text-4xl mb-3 font-semibold">Welcome Back</h2>
            <p className="mb-2">Stay Connected With Us</p>
            <p className="mb-2">Please Signup With Your Personal Info</p>
            <Link href={"/"}>
              <div className=" text-black mt-5  font-semibold bg-white px-6 py-3 rounded-lg">
                Go To Home
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div className="text-center mb-8">
            <h2 className="mb-2 text-4xl font-semibold">Let's Get Started</h2>
            <p>Create An Account</p>
            <div className="flex justify-center gap-5 mt-5">
              <FaGoogle className="text-xl  "></FaGoogle>
              <FiGithub className="text-xl  "></FiGithub>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 mb-5 border-gray-200 px-4 py-2 rounded-lg w-full"
            />
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
              Signup
            </button>
            {error && (
              <div>
                <p className="bg-red-600 px-6 py-3 my-5 text-white">{error}</p>
              </div>
            )}
          </form>
          <div className="  text-end mt-5 ">
            <Link href="/login">Have An Account ? Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
