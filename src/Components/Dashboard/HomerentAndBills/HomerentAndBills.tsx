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
import { usePathname } from "next/navigation";
import { PrimaryButton } from "@/Components/ui/Buttons/PrimaryButton";
interface AllHomeRentAndBillsProps {
  month: string;
}

const HomeRentAndBills: React.FC<AllHomeRentAndBillsProps> = ({ month }) => {
  const pathname = usePathname();
  console.log(pathname);
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
    content = <P>Home Rent And Bills Not Found</P>;
  } else if (!isLoading && !isError && allExpenses?.expenses?.length > 0) {
    content = (
      <div className="overflow-x-auto border-2  border-white rounded-lg p-5">
        <table className="table ">
          <thead>
            <tr className="text-white">
              <th></th>
              <th>Name</th>
              <th>Month</th>
              <th>HomeRent</th>
              <th>Bills</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses?.expenses
              ?.filter((m: any) => m?.month === month)
              .map((data: any, index: any) => {
                totalHomeRent += parseFloat(data.homeRent); // Add the amount to the total
                totalBills += parseFloat(data.bills); // Add the amount to the total
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{data?.name}</td>

                    <td>{data?.month}</td>
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
                      <button className="font-bold text-[#06B6D4]">
                        Unpaid
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

  const filteredExpenses = allExpenses?.expenses?.filter(
    (m: any) => m?.month === month
  );
  if (filteredExpenses?.length === 0) {
    content = <P>No Data Found For {month}</P>;
  }

  return (
    <div className="mt-5">
      {content}
      {!isLoading &&
        !isError &&
        allExpenses?.expenses?.length > 0 &&
        pathname === "/dashboard/all-homerent-bills" && (
          <P className="text-end my-5">
            Total Home Remt Amount: {totalHomeRent.toFixed(2)} BDT And Bills :{" "}
            {totalBills} BDT
          </P>
        )}
    </div>
  );
};

export default HomeRentAndBills;
