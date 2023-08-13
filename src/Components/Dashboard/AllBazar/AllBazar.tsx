"use client";
import { P } from "@/Components/ui/Heading/Heading";
import { useGetBazarQuery } from "@/app/features/bazar/bazarApi";
import React from "react";

const AllBazar = () => {
  const { data: allBazar, isLoading, isError } = useGetBazarQuery();
  console.log(allBazar?.bazars);

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
