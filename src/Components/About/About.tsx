"use client";
import HostelMealTracker from "@/app/dashboard/meal-plan/page";
import React, { useEffect, useState } from "react";
import Container from "../ui/Container/container";
import { useGetBazarQuery } from "@/app/features/bazar/bazarApi";
import { useAppSelector } from "@/app/hooks";
import { P, Subtitle } from "../ui/Heading/Heading";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import AllMealCount from "../Dashboard/AllMealCount/AllMealCount";

const About = () => {
  const { data: session } = useSession();
  console.log(session);
  const dispatch = useDispatch();
  const [totalAmountByMonth, setTotalAmountByMonth] = useState({});
  const [totalMealByUser, setTotalMealByUser] = useState({});
  console.log(totalAmountByMonth, totalMealByUser);
  useEffect(() => {
    const storedState = localStorage.getItem("reduxState");
    const initialState = storedState ? JSON.parse(storedState) : {};

    setTotalAmountByMonth(initialState.meal?.totalAmountByMonth || {});
    setTotalMealByUser(initialState.meal?.totalMealByUser || {});
  }, []);
  // const totalMeal = useAppSelector((state) => state.meal.totalAmountByMonth);
  // console.log(totalMeal);
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
  }
  console.log(totalAmount);

  const average: any = totalAmount.toFixed(2);

  return (
    <div className="my-16">
      <Container>
        <AllMealCount></AllMealCount>
      </Container>
    </div>
  );
};

export default About;
