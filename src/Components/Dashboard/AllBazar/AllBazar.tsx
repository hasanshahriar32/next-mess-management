"use client";
import { P, Subtitle, Title } from "@/Components/ui/Heading/Heading";
import {
  useAllUserQuery,
  useGetBazarQuery,
  useRemoveBazarMutation,
} from "@/app/features/bazar/bazarApi";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const AllBazar = () => {
  const { data: allBazar, isLoading, isError } = useGetBazarQuery();
  const [
    RemoveBazar,
    { isError: removeIsError, isLoading: removeIsLoading, isSuccess },
  ] = useRemoveBazarMutation();
  const { data: allUser } = useAllUserQuery();

  const handleRemove = (id: any) => {
    const agree = window.confirm("Are you sure? You want to delete");
    if (agree && id) {
      RemoveBazar(id);
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

  const defaultMonth = months[new Date().getMonth()];
  const [month, setMonth] = useState(defaultMonth);
  const [name, setName] = useState("");

  const usersWithDefaultMonthData = allBazar?.bazars
    ?.filter((m: any) => m.month === defaultMonth)
    .map((data: any) => data.name);

  // If the selected name is empty and there are users with default month data, set the name state to the first user
  useEffect(() => {
    if (name === "" && usersWithDefaultMonthData?.length > 0) {
      setName(usersWithDefaultMonthData[0]);
    }
  }, [name, usersWithDefaultMonthData]);

  // Filter the data based on selected month and name
  const filteredData = allBazar?.bazars?.filter(
    (m: any) => m.month === month && m?.name === name
  );
  let totalAmount = 0; // Initialize the total amount
  let content;

  if (isLoading && !isError) {
    content = (
      <div className="h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      </div>
    );
  } else if (!isLoading && isError && !allBazar) {
    content = <P>There is an error</P>;
  } else if (!isLoading && !isError && allBazar?.bazars?.length === 0) {
    content = <P>Bazar not found</P>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <Subtitle>All Bazar</Subtitle>
        </div>
        <div className="flex items-center gap-10">
          <div>
            <P>Filter by User Name and Month,</P>
          </div>
          <div>
            <select
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-transparent border-2 border-white select select-bordered w-full"
            >
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-2 border-white select select-bordered w-full"
            >
              {allUser?.users.map((user: any) => (
                <option key={user.name}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        {filteredData?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg">
                  <th></th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Month</th>
                  <th>Bazar</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data: any, index: any) => {
                  totalAmount += parseFloat(data.amount); // Add the amount to the total
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{data?.name}</td>
                      <td>{data?.updatedAt}</td>
                      <td>{data?.month}</td>
                      <td>{data?.bazar}</td>
                      <td>{data?.amount} BDT</td>
                      <td className="flex gap-5">
                        <button>
                          <BiEdit className="text-xl"></BiEdit>
                        </button>
                        <button onClick={() => handleRemove(data?._id)}>
                          <AiOutlineDelete className="text-xl"></AiOutlineDelete>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <P className="mt-3 text-center">
            No Data Found of {name} for {month}
          </P>
        )}
        {content}
        {!isLoading &&
          !isError &&
          allBazar?.bazars?.length > 0 &&
          filteredData?.length !== 0 && (
            <P className="text-end mt-5 ">
              Total Bazar Amount: {totalAmount.toFixed(2)} BDT
            </P>
          )}
      </div>
    </div>
  );
};

export default AllBazar;
