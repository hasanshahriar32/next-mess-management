"use client";
import HostelMealTracker from "@/app/dashboard/meal-plan/page";
import React, { useEffect } from "react";
import Container from "../ui/Container/container";
import { useGetBazarQuery } from "@/app/features/bazar/bazarApi";
import { useAppSelector } from "@/app/hooks";
import { P, Title } from "../ui/Heading/Heading";
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
        <div className="my-5">
          <P>Total Bazar : {totalAmount} DBT</P>
          <P>Total Mill : {data2} Ta</P>
          <P>Mill Rate :{average} BDT</P>
        </div>
        <div className="mb-5">
          {data1?.map(({ name, total }: any) => {
            const personAmount = personTotalAmounts[name] || 0;
            console.log(personAmount);
            const personTotalMillRate = total * average;
            return (
              <P key={name}>
                {`Name: ${name}, Total Mill: ${total}, Mill Rate: ${average},Total Expense : ${
                  average * total
                } Total Amount from Bazar: ${personAmount}, Grand Total: ${(
                  personAmount -
                  average * total
                ).toFixed(2)} BDT`}
              </P>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default About;
