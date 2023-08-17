"use client";
import { P } from "@/Components/ui/Heading/Heading";
import {
  useGetBazarQuery,
  useGetHomeAndBillsQuery,
  useRemoveBazarMutation,
  useRemoveHomeRentAndBillsMutation,
} from "@/app/features/bazar/bazarApi";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const AllHomeRentAndBills = () => {
  const { data: allExpenses, isLoading, isError } = useGetHomeAndBillsQuery();
  console.log(allExpenses?.expenses);
  const [RemoveHomeRentAndBills] = useRemoveHomeRentAndBillsMutation();

  const handleRemove = (id: any) => {
    const agree = window.confirm("Are you sure ? You Want To Delete");
    console.log("delete", id);
    if (agree && id) {
      RemoveHomeRentAndBills(id);
    }
  };

  let totalHomeRent = 0; // Initialize the total amount
  let totalBills = 0; // Initialize the total amount
  let content;
  if (isLoading && !isError) {
    content = (
      <div className="h-screen flex justify-center items-center ">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      </div>
    );
  } else if (!isLoading && isError && !allExpenses?.expenses) {
    content = <P>There is An Error</P>;
  } else if (!isLoading && !isError && allExpenses?.expenses?.length === 0) {
    content = <P>Bazar Not Found</P>;
  } else if (!isLoading && !isError && allExpenses?.expenses?.length > 0) {
    content = (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-base-200">
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>HomeRent</th>
              <th>Bills</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses?.expenses?.map((data: any, index: any) => {
              totalHomeRent += parseFloat(data.homeRent); // Add the amount to the total
              totalBills += parseFloat(data.bills); // Add the amount to the total
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data?.name}</td>
                  <td>{data?.updatedAt}</td>
                  <td>{data?.homeRent}</td>
                  <td>{data?.bills} BDT</td>
                  <td className="flex gap-5">
                    <button>
                      <BiEdit className="text-xl"></BiEdit>
                    </button>
                    <button onClick={() => handleRemove(data?._id)}>
                      <AiOutlineDelete className="text-xl"></AiOutlineDelete>
                    </button>
                  </td>

                  <td>
                    {data?.homeRent === 1500 && data?.bills === 417 ? (
                      <>
                        <P>Paid</P>
                      </>
                    ) : (
                      <>
                        <P>Unpaid</P>
                      </>
                    )}
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
    <div className="mt-16">
      {content}
      {!isLoading && !isError && allExpenses?.expenses?.length > 0 && (
        <P className="text-end">
          Total Home Remt Amount: {totalHomeRent.toFixed(2)} BDT And Bills :{" "}
          {totalBills} BDT
        </P>
      )}
    </div>
  );
};

export default AllHomeRentAndBills;
