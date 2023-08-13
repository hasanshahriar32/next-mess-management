"use client";
import { P } from "@/Components/ui/Heading/Heading";
import {
  useGetBazarQuery,
  useRemoveBazarMutation,
} from "@/app/features/bazar/bazarApi";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const AllBazar = () => {
  const { data: allBazar, isLoading, isError } = useGetBazarQuery();
  const [
    RemoveBazar,
    { isError: removeIsError, isLoading: removeIsLoading, isSuccess },
  ] = useRemoveBazarMutation();

  const handleRemove = (id: any) => {
    console.log("delete", id);
    RemoveBazar(id);
  };

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
              <th>Bazar</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBazar?.bazars?.map((data: any, index: any) => {
              totalAmount += parseFloat(data.amount); // Add the amount to the total
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data?.name}</td>
                  <td>{data?.updatedAt}</td>
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
      {content}
      {!isLoading && !isError && allBazar?.bazars?.length > 0 && (
        <P className="text-end">
          Total Bazar Amount: {totalAmount.toFixed(2)} BDT
        </P>
      )}
    </div>
  );
};

export default AllBazar;
