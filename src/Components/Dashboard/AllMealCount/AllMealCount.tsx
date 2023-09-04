"use client";
import { P, Subtitle, Title } from "@/Components/ui/Heading/Heading";
import {
  useGetBazarQuery,
  useGetMealCountQuery,
  useGetSingleUserQuery,
  useRemoveMealCountMutation,
} from "@/app/features/bazar/bazarApi";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";

interface MealData {
  user: string;
  date: string;
  month: string;
  mealNumber: number;
  mealYear: number;
  _id: string;
}
const AllMealCount = () => {
  const { data: allMealCount, isLoading, isError } = useGetMealCountQuery();
  const { data: allBazar } = useGetBazarQuery();
  const [RemoveMealCount] = useRemoveMealCountMutation();

  const { data: session } = useSession();
  const sessionEmail: any = session?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(sessionEmail);
  console.log(singleUser);
  const bazarFilterData = allBazar?.bazars?.filter(
    (bazar: any) => bazar?.bazarStatus === true
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  console.log(parseFloat(selectedYear));
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

  const filteredBazarData = bazarFilterData?.filter((bazar: any) =>
    bazar?.month.includes(month)
  );
  let totalBazarAmount: any = 0;
  let personToTotalAmount: any = {};

  if (filteredBazarData && filteredBazarData.length > 0) {
    totalBazarAmount = filteredBazarData.reduce(
      (sum: any, bazar: any) => sum + bazar.amount,
      0
    );
    filteredBazarData.forEach((bazar: any) => {
      const person = bazar?.name;
      const amount = bazar?.amount;
      if (!personToTotalAmount[person]) {
        personToTotalAmount[person] = 0;
      }
      personToTotalAmount[person] += amount;
    });
  } else {
    console.log("No filtered data available.");
  }

  const filteredData = allMealCount?.mealCount?.filter((meal: MealData) => {
    return meal.month === month && meal.mealYear === parseFloat(selectedYear);
  });
  const groupedData: { [key: string]: any } = {};
  filteredData?.forEach((data: MealData) => {
    const key = `${data.month}-${data.mealYear}`;
    console.log(key);
    if (!groupedData[key]) {
      groupedData[key] = {
        totalMeal: data.mealNumber,
        month: data.month,
        year: data.mealYear,
      };
    } else {
      groupedData[key].totalMeal += data.mealNumber;
    }
  });
  const mealInfo = Object?.values(groupedData);
  const personMealInfo: { [key: string]: any } = {};
  filteredData?.forEach((data: MealData) => {
    if (!personMealInfo[data.user]) {
      personMealInfo[data.user] = {
        userName: data.user, // Add the username
        totalMeal: data.mealNumber,
        month: data.month,
        year: data.mealYear,
      };
    } else {
      personMealInfo[data.user].totalMeal += data.mealNumber;
    }
  });
  const usersMealInfo = Object?.values(personMealInfo);
  const totalMealOfMonth = usersMealInfo.reduce(
    (totalMeal: number, info: any) => totalMeal + info.totalMeal,
    0
  );

  let averageBazarPerMeal = 0;
  if (totalBazarAmount !== 0) {
    averageBazarPerMeal = totalBazarAmount / totalMealOfMonth; // Replace totalMealCount with the actual count
  }
  console.log(averageBazarPerMeal);
  const handleRemove = (id: any) => {
    console.log("clicked", id);

    const agree = window.confirm("are you Sure ? You Want To Delete");
    if (id && agree) {
      RemoveMealCount(id);
    }
  };
  return (
    <div className="my-16">
      <div>
        <div>
          <div className="flex justify-between items-center mb-5">
            <div>
              <Subtitle>Meal Tracker</Subtitle>
            </div>
            <div className="flex items-center gap-5">
              <select
                name="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="bg-transparent border-2 border-white select select-bordered w-full"
              >
                <option>Select Month</option>
                {months.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border-2 border-white select select-bordered w-full"
              />
            </div>
          </div>
          <div>
            {allMealCount?.mealCount?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg">
                      <th>#</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Month</th>
                      <th>Meal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.map((data: any, index: number) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.user}</td>
                        <td>{data.date}</td>
                        <td>{data.month}</td>
                        <td>{data.mealNumber}</td>
                        <td className="flex gap-5">
                          {singleUser?.user?.role === "superAdmin" ? (
                            <>
                              <button onClick={() => handleRemove(data?._id)}>
                                <AiOutlineDelete className="text-xl" />
                              </button>
                            </>
                          ) : (
                            <>
                              <P>For Admin</P>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <P className="mt-3 text-center">No Data Found</P>
            )}
          </div>
          <div className="mt-3 text-end">
            {mealInfo?.map((info: any, index: number) => (
              <div key={index}>
                <P>Total Meal: {info.totalMeal}</P>
                <P>Month: {info.month},</P>
                <P>Year: {info.year}</P>
              </div>
            ))}
          </div>
          <div>
            <Title>Person's Total Meal : </Title>
            <div className="my-5 grid grid-cols-3 gap-10 ">
              {usersMealInfo?.map((info, index: number) => {
                const personalBalance =
                  personToTotalAmount[info?.userName] || 0;
                const calculatedBalance =
                  personalBalance - averageBazarPerMeal * info.totalMeal;
                return (
                  <div key={index}>
                    <div className="border-2 border-white p-5 rounded-lg  ">
                      <P>Name : {info?.userName}s</P>
                      <P>
                        {info.month}, {info.year}
                      </P>
                      <P>Personal Total Meal : {info.totalMeal}</P>
                      <P>
                        Monthly Total All Users Bazar : {totalBazarAmount} BDT
                      </P>
                      <P>Monthly Personal Bazar : {personalBalance} BDT</P>
                      <P>Average : {averageBazarPerMeal.toFixed(2)} BDT</P>
                      <P>
                        Your Expense :{" "}
                        {(averageBazarPerMeal * info.totalMeal).toFixed(2)} BDT
                      </P>
                      <P>
                        Balance :{" "}
                        {personalBalance !== 0
                          ? calculatedBalance.toFixed(2)
                          : (-averageBazarPerMeal * info.totalMeal).toFixed(
                              2
                            )}{" "}
                        BDT
                      </P>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMealCount;
