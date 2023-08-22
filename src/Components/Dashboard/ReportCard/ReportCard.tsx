"use client";
import { P, Subtitle, Title } from "@/Components/ui/Heading/Heading";
import {
  useGetBazarQuery,
  useGetSingleHomeRentAndBillsQuery,
  useGetSingleUserQuery,
} from "@/app/features/bazar/bazarApi";
import { useAppSelector } from "@/app/hooks";
import { useSession } from "next-auth/react";
import React from "react";

const ReportCard = ({ email: userEmail }: any) => {
  const { data: singleUser } = useGetSingleUserQuery(userEmail);
  console.log(singleUser?.user);

  const { data: SingleHomeRentAndBills } =
    useGetSingleHomeRentAndBillsQuery(userEmail);
  console.log(SingleHomeRentAndBills?.expenses);
  // const { name, email } = singleUser?.user;
  const totalBazar = useAppSelector((state) => state.meal.totalBazarAmount);
  const totalMill = useAppSelector((state) => state.meal.grandTotal);
  const personTotal = useAppSelector((state) => state.meal.personTotals);
  console.log(personTotal);
  console.log(totalMill);
  console.log(totalBazar);
  const average: any = (totalBazar / totalMill).toFixed(2);
  console.log(average);
  const { data: allBazar, isLoading, isError } = useGetBazarQuery();
  console.log(allBazar?.bazars);
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
      console.log("from x", x?.bazarStatus);
      if (x?.bazarStatus === true) {
        const price = parseFloat(x?.amount);
        if (!personTotalAmounts[x.name]) {
          personTotalAmounts[x.name] = price;
        } else {
          personTotalAmounts[x.name] += price;
        }
      }
    }

    //dispatch(setTotalBazarAmount(totalAmount));
  }
  return (
    <div className="my-16">
      <Title className="mb-3">
        Report Card For ,{" "}
        <span className="text-[#06B6D4]">{singleUser?.user?.name}</span>
      </Title>
      <P>Email : {singleUser?.user?.email}</P>
      <P>Home Rent : {SingleHomeRentAndBills?.expenses?.homeRent} BDT</P>
      <P>others Bills : {SingleHomeRentAndBills?.expenses?.bills} BDT</P>
      <P>Total Bazar : {totalBazar} BDT</P>
      <P>Total Meal : {totalMill}</P>
      <P>Average : {average} BDT</P>

      {personTotal
        ?.filter((e: any) => e?.email === singleUser?.user?.email)
        ?.map(({ name, total }: any) => {
          const personAmount = personTotalAmounts[name] || 0;
          console.log(personAmount);
          return (
            <>
              <div className="border-2 border-white rounded-lg p-5 my-10">
                <P>Total Meal: {`${total}`}</P>
                <P>Payment For Meal : {`${personAmount}`} BDT</P>

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
  );
};

export default ReportCard;
