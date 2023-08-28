"use client";

import { P, Subtitle } from "@/Components/ui/Heading/Heading";
import {
  useAllUserQuery,
  useGetMealCountQuery,
} from "@/app/features/bazar/bazarApi";
import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";

interface MealData {
  user: string;
  date: string;
  month: string;
  mealNumber: number;
}

const GetAllMealCount = () => {
  const { data: allMealCount, isLoading, isError } = useGetMealCountQuery();


  const defaultFilterDate = new Date().toISOString().split("T")[0];
  const [filterDate, setFilterDate] = useState<string>(defaultFilterDate);
  const [name, setName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    if (selectedMonth) {
      setSelectedYear(new Date(filterDate).getFullYear().toString());
    }
  }, [filterDate, selectedMonth]);

  const totalMealAmountByUserAndMonth: Record<
    string,
    Record<string, number>
  > = {};

  const filteredData = allMealCount?.mealCount?.filter((item: MealData) => {
    const itemDate = new Date(item.date);
    const itemMonth = itemDate.toLocaleString("default", { month: "long" });
    const itemYear = itemDate.getFullYear();

    return (
      (itemDate.toISOString().split("T")[0] === filterDate &&
        (name === "" || item.user === name)) ||
      (itemMonth === selectedMonth &&
        itemYear === new Date(filterDate).getFullYear()) ||
      (itemMonth === month && itemYear === parseInt(selectedYear))
    );
  });

  filteredData?.forEach((data: MealData) => {
    const user = data.user;
    const month = data.month;

    if (!totalMealAmountByUserAndMonth[user]) {
      totalMealAmountByUserAndMonth[user] = {};
    }

    if (!totalMealAmountByUserAndMonth[user][month]) {
      totalMealAmountByUserAndMonth[user][month] = 0;
    }

    totalMealAmountByUserAndMonth[user][month] += data.mealNumber;
  });

  const totalMealAmount =
    filteredData?.reduce(
      (total: number, data: MealData) => total + data.mealNumber,
      0
    ) || 0;

  // Dispatch the updates

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

  return (
    <div className="my-16">
      <div className="flex justify-between items-center mb-5">
        <div>
          <Subtitle>Meal Tracker</Subtitle>
          <div>
            <P className="my-2">Filter Date Of Month ,</P>
          </div>
          <div>
            <input
              type="date"
              id="filterDate"
              value={filterDate}
              required
              className="border-2 border-white select select-bordered w-full"
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div>
            <p className="my-5">Filtered By Month And Year</p>
            <div className="flex items-center gap-5">
              <select
                name="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="bg-transparent border-2 border-white select select-bordered w-full"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
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
                  <th>Total Meals</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((data: MealData, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.user}</td>
                    <td>{data.date}</td>
                    <td>{data.month}</td>
                    <td>{data.mealNumber}</td>
                    <td className="flex gap-5">
                      <button>
                        <BiEdit className="text-xl" />
                      </button>
                      <button>
                        <AiOutlineDelete className="text-xl" />
                      </button>
                    </td>
                    <td>
                      {totalMealAmountByUserAndMonth[data.user] &&
                        totalMealAmountByUserAndMonth[data.user][data.month]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <P className="mt-3 text-center">No Data Found</P>
        )}
        {!isLoading && !isError && filteredData?.length > 0 && (
          <div>
            <P className="text-end mt-5">Total Meal: {totalMealAmount} meals</P>
            <P className="text-end mt-3">Person's Total Meals:</P>
            <ul>
              {Object.entries(totalMealAmountByUserAndMonth).map(
                ([user, data]) =>
                  Object.entries(data).map(([month, mealCount]) => (
                    <li key={`${user}-${month}`}>
                      {user} ({month}): {mealCount} meals
                    </li>
                  ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllMealCount;
