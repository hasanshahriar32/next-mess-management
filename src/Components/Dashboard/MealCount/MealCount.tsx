"use client";

import {
  useAddMealCountMutation,
  useAllUserQuery,
} from "@/app/features/bazar/bazarApi";
import React, { useEffect, useState } from "react";

const MealInputComponent = () => {
  const { data: allUsers } = useAllUserQuery();

  const [AddMealCount] = useAddMealCountMutation();

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

  const resetForm = () => {
    setSelectedUser("");
    setMealDate("");
    setMealNumber("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const selectedUserData = await allUsers?.users?.find(
      (user: any) => user._id === selectedUser
    );
    console.log(selectedUserData);

    const dateObject = new Date(mealDate);
    const monthName = dateObject.toLocaleString("default", { month: "long" });
    const dayOfMonth = dateObject.getDate();

    if (selectedUserData) {
      const mealData = {
        user: selectedUserData?.name,
        email: selectedUserData.email,
        date: mealDate,
        mealNumber,
        month: monthName,
        mealYear: dateObject.getFullYear(),
        dayOfMonth,
      };

      try {
        // const res = await AddMealCount(mealData);
        // console.log(res);
        // if ("data" in res) {
        //   alert("Meal Added");
        //   resetForm();
        // }

        const res = await fetch("https://inn.vercel.app/api/meal-count", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(mealData),
        });
        console.log(res);
      } catch (error) {}
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
