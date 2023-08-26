"use client";
import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useAllUserQuery,
  useGetBazarQuery,
  useRemoveBazarMutation,
  useUpdateBazarMutation,
} from "@/app/features/bazar/bazarApi";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const ApproveBazar = () => {
  const { data: allBazar, isLoading, isError } = useGetBazarQuery();
  const [
    RemoveBazar,
    { isError: removeIsError, isLoading: removeIsLoading, isSuccess },
  ] = useRemoveBazarMutation();
  const { data: allUser } = useAllUserQuery();

  const [approveBazar] = useUpdateBazarMutation();
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

  const filteredData = allBazar?.bazars?.filter((m: any) => m.month === month);
  let totalAmount = 0; // Initialize the total amount
  let content;
  console.log(filteredData);
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

  const handleApprove = (id: string) => {
    const agree = window.confirm("Are You SUre, you want to Approve The Bazar");
    if (agree && id) {
      const approveBazarData: any = {
        id,
        updatedBazarData: {
          newBazarStatus: true,
        },
      };
      approveBazar(approveBazarData);
    }
  };

  const handleUnApprove = (id: string) => {
    const agree = window.confirm(
      "Are You Sure, you want to UnApprove The Bazar"
    );
    if (agree && id) {
      const approveBazarData: any = {
        id,
        updatedBazarData: {
          newBazarStatus: false,
        },
      };
      approveBazar(approveBazarData);
    }
  };

  return (
    <div className="my-16">
      <div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <Title className="mb-5">All Bazar</Title>
          </div>
          <div className="flex items-center gap-10">
            <div>
              <P>Filter by Month,</P>
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
          </div>
        </div>
        <div>
          {filteredData?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-base-200">
                    <th></th>
                    <th>Name</th>
                    <th>Month</th>
                    <th>Bazar</th>
                    <th>Amount</th>
                    <th>Action</th>
                    <th>Bazar Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((data: any, index: any) => {
                    totalAmount += parseFloat(data.amount); // Add the amount to the total
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{data?.name}</td>

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
                        <td>
                          {data?.bazarStatus === true ? (
                            <>
                              <button
                                onClick={() => handleUnApprove(data?._id)}
                              >
                                AlReady Approved
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleApprove(data?._id)}>
                                unApproved
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <P className="mt-3 text-center">No Data Found for {month}</P>
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
    </div>
  );
};

export default ApproveBazar;
