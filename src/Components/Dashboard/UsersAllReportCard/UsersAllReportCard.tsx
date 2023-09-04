"use client";

import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useGetReportCardQuery,
  useGetSingleUserQuery,
  // ... (other imports)
} from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// ... (other imports)

const UsersAllReportCard = () => {
  const { data: session } = useSession();
  const sessionEmail: any = session?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(sessionEmail);

  const {
    data: allReportCard,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    error,
  } = useGetReportCardQuery();
  console.log(allReportCard?.reportCard);
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
  // console.log(allReportCard?.reportCard);
  const [selectedData, setSelectedData] = useState<any | null>(null); // State to hold the data for the selected row
  const [filteredReportCard, setFilteredReportCard] = useState<any[] | null>(
    null
  ); // State to hold the filtered report card data

  useEffect(() => {
    // Filter the report card data based on the selected month
    if (allReportCard?.reportCard) {
      const filteredData = allReportCard.reportCard.filter(
        (data: any) => data?.month === month
      );
      setFilteredReportCard(filteredData);
    }
  }, [allReportCard, month]);
  const handleDetails = (data: any) => {
    setSelectedData(data);
  };

  const closeModal = () => {
    setSelectedData(null);
  };
  console.log(selectedData);
  return (
    <div>
      {allReportCard?.reportCard?.length > 0 ? (
        <>
          <div className="mt-16">
            <div className="flex justify-between my-5">
              <div>
                <Title> Users Report Card</Title>
              </div>
              <div className="flex gap-5 items-center">
                <P>Filter By Month</P>
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

            {allReportCard?.reportCard?.length > 0 && (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg">
                      <th>Serial No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReportCard?.map((data: any, index: any) => (
                      <React.Fragment key={data?._id}>
                        {data?.dynamicData.map((d: any) => (
                          <tr key={d?._id}>
                            <td>{index + 1}</td>
                            <td>{d?.name}</td>
                            <td>{data?.userEmail}</td>
                            <td>
                              <button
                                onClick={() => handleDetails({ data, d })}
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {selectedData && (
              <div className="fixed inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-900 opacity-50 backdrop-blur"></div>
                <div className="z-10 modal-content text-black bg-white p-8 rounded-lg w-[500px]">
                  <h2 className="text-xl font-semibold">
                    Report Card of {selectedData?.data?.month}
                  </h2>
                  <Image
                    src={selectedData?.data?.image}
                    alt=""
                    width={250}
                    height={250}
                  ></Image>
                  <h2 className="text-xl font-semibold ">
                    {" "}
                    Name : {selectedData?.d?.name}
                  </h2>
                  <p>Email : {selectedData?.data?.userEmail}</p>
                  <p>Home Rent : {selectedData?.data?.homeRent} BDT</p>
                  <p>Bills : {selectedData?.data?.bills} BDT</p>
                  <p>Total Bazar : {selectedData?.data?.totalBazar} BDT</p>
                  <p>Total Meal : {selectedData?.data?.totalMeal} BDT</p>
                  <p>Average : {selectedData?.data?.average} BDT</p>
                  <p>Personal Total Meal : {selectedData?.d?.total}</p>
                  <p>
                    Personal Total Given Amount :{" "}
                    {selectedData?.d?.personAmount} BDT
                  </p>
                  <p>
                    Person Meal Expense:{" "}
                    {`${selectedData?.d?.expenseForMeal} BDT ( Average * Personal Total Meal )  `}
                  </p>
                  <p>
                    Difference :{" "}
                    {`${selectedData?.d?.paymentDifference} BDT ( personAmount - Person Meal Expense)`}
                  </p>

                  <div className="flex justify-end mt-5 font-bold">
                    <button className="modal-close " onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="">
            <p className="text-xl  ">No Data Found</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersAllReportCard;
