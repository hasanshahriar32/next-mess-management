"use client";
import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useGetBazarQuery,
  useGetHomeAndBillsQuery,
  useRemoveBazarMutation,
} from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import AddBazar from "../AddBazar/AddBazar";

const MyHomeRentAndBills = () => {
  const { data: session } = useSession();

  const { data: homeRentAndBills } = useGetHomeAndBillsQuery();
  console.log(homeRentAndBills);
  const [RemoveBazar, { isError, isLoading, isSuccess, error }] =
    useRemoveBazarMutation();
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

  // Calculate the total amount of your bazar entries
  const filteredHomerentAndBills = homeRentAndBills?.expenses?.filter(
    (entry: any) => entry.email === session?.user?.email
  );

  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );

  const handleRemove = (id: any) => {
    console.log("delete", id);
    const agree = window.confirm("Are You Sure ? You Want To Delete");
    if (agree && id) {
      RemoveBazar(id);
    }
  };

  const handleMonthChange = (selectedMonth: string) => {
    setSelectedMonth(selectedMonth);
  };

  const filteredEntries = filteredHomerentAndBills?.filter(
    (entry: any) => entry.month === selectedMonth
  );

  return (
    <div className="mt-16 border-2 border-white p-6  rounded-lg">
      <div className="flex justify-between  mb-5">
        <div>
          <Title className="mb-5">Home Rent Bills</Title>
        </div>
        <div>
          <select
            name="month"
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="bg-transparent border-2 border-white select select-bordered w-full"
          >
            <option value="">All Months</option>
            {months?.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredEntries?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg">
                <th>Serial No</th>
                <th>Date</th>
                <th>Month</th>
                <th>Home Rent</th>
                <th>Bills</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries?.map((entry: any, index: number) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{entry?.homeRentDate}</td>
                  <td>{entry?.month}</td>
                  <td>{entry?.homeRent}</td>
                  <td>{entry?.bills}</td>
                  <td className="flex gap-5 items-center">
                    <button onClick={() => handleRemove(entry?._id)}>
                      <AiOutlineDelete className="text-xl cursor-pointer"></AiOutlineDelete>
                    </button>
                  </td>
                  <td>
                    {entry?.homeRentAndBills === true ? (
                      <>
                        <P>Approved</P>
                      </>
                    ) : (
                      <>
                        <P>UnApproved</P>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <P className="mt-3 text-center">
          {selectedMonth
            ? `No Data Found for ${selectedMonth}`
            : "You Didn't Bazar Yet"}
        </P>
      )}
    </div>
  );
};

export default MyHomeRentAndBills;
