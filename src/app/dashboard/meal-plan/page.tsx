"use client";
import { setGrandTotal, setPersonTotals } from "@/app/features/meal/mealSlice";
import { useAppDispatch } from "@/app/hooks";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

interface PersonMeals {
  name: string;
  meals: number[];
}

const personNames: string[] = ["Pervez", "Minhaz", "Raihan", "Nasir"];

const HostelMealTracker: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  console.log(session);
  const initialData: PersonMeals[] = personNames.map((name) => ({
    name: name,
    meals: Array(31).fill(0),
  }));

  const [mealData, setMealData] = useState<PersonMeals[]>(initialData);
  useEffect(() => {
    const savedData = localStorage.getItem("mealData");
    if (savedData) {
      setMealData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever mealData changes
  useEffect(() => {
    localStorage.setItem("mealData", JSON.stringify(mealData));
  }, [mealData]);

  const handleMealChange = (
    personIndex: number,
    dayIndex: number,
    newValue: number
  ) => {
    const updatedData = [...mealData];
    updatedData[personIndex].meals[dayIndex] = newValue;
    if (session?.user?.email === "p.hossain9254@gmail.com") {
      setMealData(updatedData);
    }
  };

  const calculatePersonTotal = (personIndex: number): number => {
    return mealData[personIndex].meals.reduce(
      (total, count) => total + count,
      0
    );
  };

  const calculateDayTotal = (dayIndex: number): number => {
    return mealData.reduce(
      (total, person) => total + person.meals[dayIndex],
      0
    );
  };

  const calculateGrandTotal = (): number => {
    return mealData.reduce(
      (total, person) => total + calculatePersonTotal(mealData.indexOf(person)),
      0
    );
  };

  const calculatePersonTotals = () => {
    const calculatedPersonTotals = mealData.map((person) => {
      const total = person.meals.reduce((total, count) => total + count, 0);
      return { name: person.name, total };
    });

    dispatch(setPersonTotals(calculatedPersonTotals)); // Dispatch person totals to Redux
  };

  const calculateGrandTotals = () => {
    const calculatedGrandTotal = mealData.reduce(
      (total, person, personIndex) => total + calculatePersonTotal(personIndex),
      0
    );

    dispatch(setGrandTotal(calculatedGrandTotal)); // Dispatch grand total to Redux
  };

  useEffect(() => {
    calculatePersonTotals();
    calculateGrandTotals();
  }, [mealData]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Mess Meal Tracker</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-1 border">Name</th>
              {Array.from({ length: 31 }, (_, index) => (
                <th key={index} className="px-2 py-1 border">
                  {index + 1}
                </th>
              ))}
              <th className="px-2 py-1 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {mealData.map((person, personIndex) => (
              <tr key={personIndex}>
                <td className="px-2 py-1 border">{person.name}</td>
                {person.meals.map((count, dayIndex) => (
                  <td key={dayIndex} className="px-2 py-1 border">
                    <input
                      type="number"
                      value={count}
                      onChange={(e) =>
                        handleMealChange(
                          personIndex,
                          dayIndex,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-6 text-center"
                    />
                  </td>
                ))}
                <td className="px-2 py-1 border">
                  {calculatePersonTotal(personIndex)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-2 py-1 font-semibold border">Total</td>
              {Array.from({ length: 31 }, (_, dayIndex) => (
                <td key={dayIndex} className="px-2 py-1 border">
                  {calculateDayTotal(dayIndex)}
                </td>
              ))}
              <td className="px-2 py-1 font-semibold border">
                {calculateGrandTotal()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostelMealTracker;
