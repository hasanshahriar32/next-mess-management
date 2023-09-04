"use client";
import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useAllUserQuery,
  useApproveHomeRentAndBillsMutation,
  useGetBazarQuery,
  useGetHomeAndBillsQuery,
  useGetSingleUserQuery,
  useRemoveBazarMutation,
  useRemoveHomeRentAndBillsMutation,
} from "@/app/features/bazar/bazarApi";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { PrimaryButton } from "@/Components/ui/Buttons/PrimaryButton";
import { useSession } from "next-auth/react";

const AllHomeRentAndBills = () => {
  const pathname = usePathname();
  console.log(pathname);
  const { data: allExpenses, isLoading, isError } = useGetHomeAndBillsQuery();
  console.log(allExpenses?.expenses);
  const { data: allUser } = useAllUserQuery();
  const { data: session } = useSession();
  const SessionEmail: any = session?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(SessionEmail);
  console.log(singleUser?.user?.role);
  const [RemoveHomeRentAndBills] = useRemoveHomeRentAndBillsMutation();
  const [name, setName] = useState("");
  const [ApproveHomeRentAndBills] = useApproveHomeRentAndBillsMutation();
  const handleRemove = (id: any) => {
    const agree = window.confirm("Are you sure ? You Want To Delete");
    console.log("delete", id);
    if (agree && id) {
      RemoveHomeRentAndBills(id);
    }
  };
  const months = [
    `January`,
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

  // Filter expenses based on selected month
  const filteredExpenses =
    month === "All"
      ? allExpenses?.expenses
      : allExpenses?.expenses?.filter((data: any) => data.month === month);

  // Calculate total amounts for home rent and bills
  let totalHomeRent =
    filteredExpenses?.reduce(
      (total: any, data: any) => total + parseFloat(data.homeRent),
      0
    ) || 0;
  let totalBills =
    filteredExpenses?.reduce(
      (total: any, data: any) => total + parseFloat(data.bills),
      0
    ) || 0;

  const handlePaid = (id: any) => {
    console.log(id);
    const agree = window.confirm(
      "Are You Sure, you want to Approve The Home Rent ANd Bills"
    );
    if (agree && id) {
      const approveHomeRentAndBills = {
        id,
        expenses: {
          newHomeRentAndBills: true,
        },
      };
      console.log(approveHomeRentAndBills);
      ApproveHomeRentAndBills(approveHomeRentAndBills);
    }
  };

  const handleUnPaid = (id: string) => {
    console.log(id);
    const agree = window.confirm(
      "Are You Sure, you want to UnApprove The Home Rent ANd Bills"
    );
    if (agree && id) {
      const approveHomeRentAndBills = {
        id,
        expenses: {
          newHomeRentAndBills: false,
        },
      };
      console.log(approveHomeRentAndBills);
      ApproveHomeRentAndBills(approveHomeRentAndBills);
    }
  };

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
      <div className="overflow-x-auto border-2  border-white rounded-lg p-5">
        <table className="table ">
          <thead>
            <tr className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg">
              <th></th>
              <th>Name</th>
              <th>Month</th>
              <th>HomeRent</th>
              <th>Bills</th>
              <th>Action</th>
              <th>HomeRent And Bills</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses?.map((data: any, index: any) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data?.name}</td>
                  <td>{data?.month}</td>
                  <td>{data?.homeRent}</td>
                  <td>{data?.bills} BDT</td>
                  <td className="flex gap-5">
                    {singleUser?.user?.role === "superAdmin" ? (
                      <>
                        {" "}
                        <button>
                          <BiEdit className="text-xl"></BiEdit>
                        </button>
                        <button onClick={() => handleRemove(data?._id)}>
                          <AiOutlineDelete className="text-xl"></AiOutlineDelete>
                        </button>
                      </>
                    ) : (
                      <>
                        <P>only Admin can Take Action</P>
                      </>
                    )}
                  </td>
                  <td>
                    {singleUser?.user?.role === "superAdmin" ? (
                      <>
                        {" "}
                        {data?.homeRentAndBills === true ? (
                          <>
                            {" "}
                            <button
                              onClick={() => handleUnPaid(data?._id)}
                              className="font-bold text-[#06B6D4]"
                            >
                              Approved
                            </button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <button
                              onClick={() => handlePaid(data?._id)}
                              className="font-bold text-[#06B6D4]"
                            >
                              UnApproved
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {" "}
                        <P>only Admin can Approve</P>
                      </>
                    )}
                  </td>
                  <td>
                    {data?.homeRentAndBills === true ? (
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <Title className="mb-5">All Users Homes Rent And Bills</Title>
        </div>
        <div>
          <div>
            <select
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-transparent border-2 border-white select select-bordered w-full"
            >
              <option value="All">All Months</option>
              {months?.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {content}
      {!isLoading && !isError && allExpenses?.expenses?.length > 0 && (
        <P className="text-end my-5">
          Total Home Remt Amount: {totalHomeRent.toFixed(2)} BDT And Bills :{" "}
          {totalBills} BDT
        </P>
      )}
    </div>
  );
};

export default AllHomeRentAndBills;
