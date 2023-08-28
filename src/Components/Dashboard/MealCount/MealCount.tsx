"use client";

import { useAllUserQuery } from "@/app/features/bazar/bazarApi";
import React, { useEffect, useState } from "react";

const MealInputComponent = () => {
  const { data: allUsers } = useAllUserQuery();

  const [selectedUser, setSelectedUser] = useState("");
  const [mealDate, setMealDate] = useState("");
  const [mealNumber, setMealNumber] = useState("");
  const handleUserChange = (event: any) => {
    setSelectedUser(event.target.value);
    console.log(event.target.value);
  };

  const handleMealDateChange = (event: any) => {
    setMealDate(event.target.value);
  };

  const handleMealNumberChange = (event: any) => {
    setMealNumber(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const selectedUserData = await allUsers?.users?.find(
      (user: any) => user._id === selectedUser
    );
    console.log(selectedUserData);

    const dateObject = new Date(mealDate);
    const monthName = dateObject.toLocaleString("default", { month: "long" });
    const year = dateObject.getFullYear();
    const dayOfMonth = dateObject.getDate();
    // console.log("Month Name:", monthName);
    // console.log("Year:", year);
    // console.log("Day of Month:", dayOfMonth);
    if (selectedUserData) {
      const mealData = {
        user: selectedUserData?.name,
        email: selectedUserData.email,
        date: mealDate,
        mealNumber,
        month: monthName,
        year,
        dayOfMonth,
      };
      console.log(mealData);
    }
  };

  return (
    <div className="my-16">
      {allUsers?.users?.length > 0 ? (
        <>
          {" "}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-10">
              <div className="flex flex-col">
                <label htmlFor="userSelect " className="mb-3">
                  Select User:{" "}
                </label>
                <select
                  id="userSelect"
                  value={selectedUser}
                  onChange={handleUserChange}
                  required
                  className="border-2 border-white select select-bordered w-full"
                >
                  <option className="selected">Select Users</option>
                  {allUsers?.users?.map((user: any) => (
                    <option key={user.id} value={user._id}>
                      {user?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="mealDate " className="mb-3">
                  Meal Date:{" "}
                </label>
                <input
                  type="date"
                  id="mealDate"
                  value={mealDate}
                  required
                  className="border-2 border-white select select-bordered w-full"
                  onChange={handleMealDateChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="mealNumber " className="mb-3">
                  Meal Number:{" "}
                </label>
                <input
                  type="number"
                  id="mealNumber"
                  value={mealNumber}
                  required
                  className="border-2  border-white select select-bordered w-full"
                  onChange={handleMealNumberChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className=" mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg"
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <>Loading user data...</>
      )}
    </div>
  );
};

export default MealInputComponent;
