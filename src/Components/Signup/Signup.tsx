"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAddUsersMutation } from "@/app/features/bazar/bazarApi";

interface signupInterface {
  name: string;
  email: string;
  password: string;
  role: string;
  personalNumber: number;
  parentNumber: number;
  religious: string;
  bloodGroup: string;
  idCard: number;
  selectedImage: string;
  month: string;
  reportCardStatus: boolean;
  messMemberStatus: boolean;
}
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");
  const [parentNumber, setParentNumber] = useState("");
  const [religious, setReligious] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [bloodGroup, setBloodGroup] = useState("");
  const [idCard, setNationalIdCard] = useState("");
  const [month, setMonth] = useState("");
  const [error, setError] = useState("");
  const [AddUsers] = useAddUsersMutation();

  const router = useRouter();
  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPersonalNumber("");
    setParentNumber("");
    setReligious("");
    setBloodGroup("");
    setNationalIdCard("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All Fields Fillup Needed");
    }

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=86fe1764d78f51c15b1a9dfe4b9175cf",
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await response.json();

      const signupInfo: signupInterface = {
        name,
        email,
        password,
        role: "user",
        selectedImage: imageData.data.url,
        personalNumber: parseFloat(personalNumber),
        parentNumber: parseFloat(personalNumber),
        religious,
        bloodGroup,
        month,
        idCard: parseFloat(idCard),
        reportCardStatus: false,
        messMemberStatus: false,
      };
      try {
        const response = await AddUsers(signupInfo);
        console.log(response);
        if ("data" in response) {
          router.push("/login");
          reset();
        }
      } catch (error) {
        console.log(error);
      }

      // Continue with the rest of the signup process
    } else {
      const signupInfo: signupInterface = {
        name,
        email,
        password,
        role: "user",
        selectedImage: "", // or some default value
        personalNumber: parseFloat(personalNumber),
        parentNumber: parseFloat(personalNumber),
        religious,
        bloodGroup,
        month,
        idCard: parseFloat(idCard),
        reportCardStatus: false,
        messMemberStatus: false,
      };
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className=" w-5/6 mx-auto grid grid-cols-2 gap-32 justify-between items-center ">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-screen flex items-center justify-center">
          <div>
            <h2 className="text-4xl mb-3 font-semibold">
              Welcome To Signup Page
            </h2>
            <p className="mb-2">Stay Connected With Us</p>
            <p className="mb-2">Please Signup With Your Personal Info</p>
            <div>
              <Link href={"/"}>
                <div className=" text-black mt-5  font-semibold bg-white px-6 py-3 rounded-lg">
                  Go To Home
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center mb-8">
            <h2 className="mb-2 text-4xl font-semibold">Let's Get Started</h2>
            {/* <p>Create An Account</p>
            <div className="flex justify-center gap-5 mt-5">
              <FaGoogle className="text-xl  "></FaGoogle>
              <FiGithub className="text-xl  "></FiGithub>
            </div> */}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                placeholder="Enter your name"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="border-2 bg-transparent  border-gray-200 px-4 py-2 rounded-lg w-full"
              />
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  setSelectedImage(file);
                }}
                className="border-2 border-gray-200 bg-transparent px-4 py-2 rounded-lg w-full"
              />

              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="border-2 bg-transparent  border-gray-200 px-4 py-3 rounded-lg w-full"
              />
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                className="border-2  bg-transparent border-gray-200 px-4 py-2 rounded-lg w-full"
              />
              <select
                name="month"
                value={month}
                required
                onChange={(e) => setMonth(e.target.value)}
                className=" border-2 bg-transparent border-white select select-bordered w-full"
              >
                {months.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
              <input
                type="text"
                name="personalNumber"
                value={personalNumber}
                required
                onChange={(e) => setPersonalNumber(e.target.value)}
                placeholder="Enter your Personal Number"
                className="border-2 bg-transparent border-gray-200 px-4 py-2 rounded-lg w-full"
              />
              <input
                type="text"
                name="parentNumber"
                value={parentNumber}
                required
                onChange={(e) => setParentNumber(e.target.value)}
                placeholder="Enter your Parent Number"
                className="border-2 bg-transparent border-gray-200 px-4 py-2 rounded-lg w-full"
              />
              <input
                type="text"
                name="religious"
                value={religious}
                required
                onChange={(e) => setReligious(e.target.value)}
                placeholder="Enter your Religious"
                className="border-2 bg-transparent border-gray-200 px-4 py-3 rounded-lg w-full"
              />
              <select
                name="bloodGroup"
                required
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="border-2 border-white select select-bordered w-full"
              >
                <option value="">Select Your Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="idCard"
                value={idCard}
                required
                onChange={(e) => setNationalIdCard(e.target.value)}
                placeholder="Enter your National Id Card Number"
                className="border-2 bg-transparent border-gray-200 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <button className="w-full my-5 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-white rounded-lg">
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
