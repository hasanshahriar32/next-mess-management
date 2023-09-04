"use client";
import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useGetBazarQuery,
  useRemoveBazarMutation,
} from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import AddBazar from "../AddBazar/AddBazar";

const MyBazar = () => {
  const { data: bazarData } = useGetBazarQuery();
  const { data: session } = useSession();
  const [RemoveBazar, { isError, isLoading, isSuccess, error }] =
    useRemoveBazarMutation();
  console.log(bazarData);
  // Calculate the total amount of your bazar entries
  const myBazarEntries = bazarData?.bazars?.filter(
    (entry: any) => entry.email === session?.user?.email
  );

  const handleRemove = (id: any) => {
    console.log("delete", id);
    const agree = window.confirm("Are You Sure ? You Want To Delete");
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
  const filteredBazarEntries = myBazarEntries?.filter(
    (m: any) => m.month === month
  );
  const totalAmount = filteredBazarEntries?.reduce(
    (total: number, entry: any) => total + parseFloat(entry.amount),
    0
  );
  return (
    <div className="mt-16 border-2 border-white p-6  rounded-lg">
      <div className="flex justify-between  mb-5">
        <div>
          {" "}
          <Title className="mb-5">Bazar</Title>
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

      <>
        {filteredBazarEntries?.length > 0 ? (
          <>
            {" "}
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg">
                    <th>Serial No</th>
                    <th>Bazar</th>
                    <th>Date</th>
                    <th>Month</th>
                    <th>Amount</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myBazarEntries
                    ?.filter((m: any) => m.month === month)
                    .map((entry: any, index: number) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{entry?.bazar}</td>
                        <td>{entry?.updatedAt}</td>
                        <td>{entry?.month}</td>
                        <td>{entry?.amount}</td>
                        <td className="flex gap-5">
                          <Link href={`/dashboard/edit-my-bazar/${entry?._id}`}>
                            <button>
                              <BiEdit className="text-xl cursor-pointer"></BiEdit>
                            </button>
                          </Link>
                          <button onClick={() => handleRemove(entry?._id)}>
                            <AiOutlineDelete className="text-xl cursor-pointer"></AiOutlineDelete>
                          </button>
                        </td>
                        <td>
                          {entry?.bazarStatus === true ? (
                            <>
                              <P>Approved</P>
                            </>
                          ) : (
                            <>UnApproved</>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-end me-16">
              Total Amount: {totalAmount} {/* Display the total amount */}
            </p>
          </>
        ) : (
          <>
            {" "}
            {myBazarEntries?.length > 0 ? (
              <P className="mt-3 text-center">No Data Found for {month}</P>
            ) : (
              <P className="mt-3 text-center">You Didn't Bazar Yet</P>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default MyBazar;
