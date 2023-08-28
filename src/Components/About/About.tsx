"use client";
import HostelMealTracker from "@/app/manager-panel/meal-plan/page";
import React, { useEffect } from "react";
import Container from "../ui/Container/container";
import { useGetBazarQuery } from "@/app/features/bazar/bazarApi";
import { useAppSelector } from "@/app/hooks";
import { P, Subtitle } from "../ui/Heading/Heading";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setTotalBazarAmount } from "@/app/features/meal/mealSlice";

const About = () => {
  const data1 = useAppSelector((state) => state.meal.personTotals);
  const data2 = useAppSelector((state) => state.meal.grandTotal);
  console.log(data1);
  console.log(data2);

  const { data: session } = useSession();
  console.log(session);
  const dispatch = useDispatch();

  const { data: allBazar, isLoading, isError } = useGetBazarQuery();
  console.log(allBazar?.bazars);

  let totalAmount = 0;
  let personTotalAmounts: Record<string, number> = {};
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
    for (let x of allBazar?.bazars) {
      // console.log(x);
      const price = parseFloat(x.amount);
      totalAmount += price;
      if (!personTotalAmounts[x.name]) {
        personTotalAmounts[x.name] = price;
      } else {
        personTotalAmounts[x.name] += price;
      }
    }
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    dispatch(setTotalBazarAmount(totalAmount));
    console.log(totalAmount);
  }
  console.log(totalAmount);

  const average: any = (totalAmount / data2).toFixed(2);
  console.log(average);
  return (
    <div>
      <Container>
        <HostelMealTracker></HostelMealTracker>
        <div className="mt-10 grid lg:grid-cols-4 gap-10">
          <div className="text-white px-6 py-6 font-semibold rounded-lg cursor-pointer transition duration-500 transform hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500">
            <div>
              <Subtitle>Total Bazar</Subtitle>
              <P className="text-white"> {totalAmount} DBT</P>
            </div>
            <div></div>
          </div>

          <div className="text-white px-6 py-6 font-semibold rounded-lg cursor-pointer transition duration-500 transform hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500">
            <Subtitle>Total Bazar</Subtitle>
            <P className="text-white"> {totalAmount} DBT</P>
          </div>
          <div className="text-white px-6 py-6 font-semibold rounded-lg cursor-pointer transition duration-500 transform hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500">
            <Subtitle>Total Mill</Subtitle>
            <P className="text-white">{data2} DBT</P>
          </div>
          <div className="text-white px-6 py-6 font-semibold rounded-lg cursor-pointer transition duration-500 transform hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500">
            <Subtitle>Mill Rate</Subtitle>
            <P className="text-white"> {average} DBT</P>
          </div>
        </div>
        <div className="my-10 grid lg:grid-cols-3 gap-10 ">
          {data1?.map(({ name, total }: any) => {
            const personAmount = personTotalAmounts[name] || 0;
            console.log(personAmount);
            return (
              <>
                <div className="border-2 border-white rounded-lg p-5 ">
                  <Subtitle>{name}</Subtitle>
                  <P>Total Meal: {`${total}`}</P>
                  <P>Payment For Meal : {`${personAmount}`} BDT</P>
                  <P>Meal Rate: {`${average}`} BDT</P>
                  <P>
                    Expense For Meal : {`${(average * total).toFixed(2)}`} BDT
                  </P>
                  <P>
                    Payment Difference:{" "}
                    {`${(personAmount - average * total).toFixed(2)}`} BDT
                  </P>
                </div>
              </>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default About;
