"use client";
import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useGetBazarQuery,
  useRemoveBazarMutation,
} from "@/app/features/bazar/bazarApi";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const AllBazar = () => {
  const { data: allBazar, isLoading, isError } = useGetBazarQuery();
  const [
    RemoveBazar,
    { isError: removeIsError, isLoading: removeIsLoading, isSuccess },
  ] = useRemoveBazarMutation();

  const handleRemove = (id: any) => {
    const agree = window.confirm("Are you sure ? You Want To Delete");
    console.log("delete", id);
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
  const [month, setMonth] = useState(months[new Date().getMonth()]);

  let totalAmount = 0; // Initialize the total amount
  let content;
  if (isLoading && !isError) {
    content = (
      <div className="h-screen flex justify-center items-center ">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      </div>
    );
  } else if (!isLoading && isError && !allBazar) {
    content = <P>There is An Error</P>;
  } else if (!isLoading && !isError && allBazar?.bazars?.length === 0) {
    content = <P>Bazar Not Found</P>;
  } else if (!isLoading && !isError && allBazar?.bazars?.length > 0) {
    content = (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-base-200">
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
            {allBazar?.bazars
              ?.filter((m: any) => m.month === month)
              .map((data: any, index: any) => {
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
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div>
          <Title className="mb-5">All Bazar</Title>
        </div>
        <div>
          <select
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="  bg-transparent border-2 border-white  select select-bordered w-full "
          >
            {months?.map((month) => {
              return (
                <>
                  <option>{month}</option>
                </>
              );
            })}
          </select>
        </div>
      </div>
      {content}
      {!isLoading && !isError && allBazar?.bazars?.length > 0 && (
        <P className="text-end mt-5 ">
          Total Bazar Amount: {totalAmount.toFixed(2)} BDT
        </P>
      )}
    </div>
  );
};

export default AllBazar;
