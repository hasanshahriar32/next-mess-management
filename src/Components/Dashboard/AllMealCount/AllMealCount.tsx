"use client";
import { P, Subtitle } from "@/Components/ui/Heading/Heading";
import { useGetMealCountQuery } from "@/app/features/bazar/bazarApi";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  updateTotalAmountByMonth,
  updateTotalMealByUser,
} from "@/app/features/meal/mealSlice";

interface MealData {
  user: string;
  date: string;
  month: string;
  mealNumber: number;
}

const AllMealCount = () => {
  const { data: allMealCount, isLoading, isError } = useGetMealCountQuery();
  const dispatch = useDispatch();
  const defaultFilterDate = new Date().toISOString().split("T")[0];
  const [filterDate, setFilterDate] = useState<string>(defaultFilterDate);

  const totalMealAmountByUserAndMonth: Record<
    string,
    Record<string, number>
  > = {};

  const filteredData = allMealCount?.mealCount;

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
  useEffect(() => {
    dispatch(updateTotalAmountByMonth(totalMealAmountByUserAndMonth));
    dispatch(updateTotalMealByUser(totalMealAmountByUserAndMonth));
  }, [totalMealAmountByUserAndMonth, dispatch]);
  return (
    <div className="my-16">
      <div className="flex justify-between items-center mb-5">
        <div>
          <Subtitle>Meal Tracker</Subtitle>
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

export default AllMealCount;
