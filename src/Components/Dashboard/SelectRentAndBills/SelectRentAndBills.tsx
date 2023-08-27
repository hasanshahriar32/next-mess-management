"use client";

import { Title } from "@/Components/ui/Heading/Heading";
import {
  useAddHomeAndBillsMutation,
  useAddSelectHomeRentAndBillsMutation,
  useAllUserQuery,
} from "@/app/features/bazar/bazarApi";
import React, { useEffect, useState } from "react";

const SelectRentAndBills = () => {
  const { data: allUsers } = useAllUserQuery();
  const [AddSelectHomeRentAndBills] = useAddSelectHomeRentAndBillsMutation();
  const [selectedUser, setSelectedUser] = useState("");
  const [postDate, setPostDate] = useState("");
  const [electricityBill, setElectricityBill] = useState("");
  const [netBill, setNetBill] = useState("");
  const [gasBill, setGasBill] = useState("");
  const [homeRent, setHomeRent] = useState("");
  const handleUserChange = (event: any) => {
    setSelectedUser(event.target.value);
    console.log(event.target.value);
  };

  const handlePostDateChange = (event: any) => {
    setPostDate(event.target.value);
  };

  const handleHomeRentChange = (event: any) => {
    setHomeRent(event.target.value);
  };
  const handleElectricityBillChange = (event: any) => {
    setElectricityBill(event.target.value);
  };
  const handleNetBillChange = (event: any) => {
    setNetBill(event.target.value);
  };
  const handleGasBillChange = (event: any) => {
    setGasBill(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const selectedUserData = await allUsers?.users?.find(
      (user: any) => user._id === selectedUser
    );
    console.log(selectedUserData);

    const dateObject = new Date(postDate);
    const monthName = dateObject.toLocaleString("default", { month: "long" });
    const year = dateObject.getFullYear();
    const dayOfMonth = dateObject.getDate();

    if (selectedUserData) {
      const RentAndBillsData = {
        user: selectedUserData?.name,
        email: selectedUserData.email,
        date: postDate,
        homeRent: parseFloat(homeRent),
        month: monthName,
        year,
        dayOfMonth,
        bills: [
          { netBill: parseFloat(netBill) },
          { gasBill: parseFloat(gasBill) },
          { electricityBill: parseFloat(electricityBill) },
        ],
      };
      console.log(RentAndBillsData);

      try {
        const res = await AddSelectHomeRentAndBills(RentAndBillsData);
        console.log(res);
        if ("data" in res) {
          alert("Home Rent And Bills Updated");
        }
      } catch (error) {
        console.log(error);
      }

      // const res = await fetch("/api/select-homerent-bills", {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(RentAndBillsData),
      // });
    }
  };

  return (
    <div className="my-16">
      <Title className="mb-5">Selecte Home Rent And Bills</Title>
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
                  Date:{" "}
                </label>
                <input
                  type="date"
                  id="postDate"
                  value={postDate}
                  required
                  className="border-2 border-white select select-bordered w-full"
                  onChange={handlePostDateChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-3">Home Rent</label>
                <input
                  type="number"
                  id="homeRent"
                  value={homeRent}
                  required
                  placeholder="Enter Home Rent"
                  className="border-2  border-white select select-bordered w-full"
                  onChange={handleHomeRentChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-3">Electricity Bill</label>
                <input
                  type="number"
                  id="electricityBill"
                  value={electricityBill}
                  required
                  placeholder="Enter Electricity  Bill"
                  className="border-2  border-white select select-bordered w-full"
                  onChange={handleElectricityBillChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-3">Net Bill</label>
                <input
                  type="number"
                  id="netBill"
                  value={netBill}
                  required
                  placeholder="Enter Net Bill"
                  className="border-2  border-white select select-bordered w-full"
                  onChange={handleNetBillChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-3">Gas Bill</label>
                <input
                  type="number"
                  id="gasBill"
                  value={gasBill}
                  required
                  placeholder="Enter Gas Bill"
                  className="border-2  border-white select select-bordered w-full"
                  onChange={handleGasBillChange}
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

export default SelectRentAndBills;
