"use client";
import { P, Subtitle, Title } from "@/Components/ui/Heading/Heading";
import {
  useGetBazarQuery,
  useGetSingleHomeRentAndBillsQuery,
  useGetSingleUserQuery,
} from "@/app/features/bazar/bazarApi";
import { useAppSelector } from "@/app/hooks";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

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
  const [dynamicData, setDynamicData] = useState<Record<string, any>>({});
  const [personAmount, setPersonAmount] = useState("");
  const [total, setTotal] = useState();
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
  const handleButtonClick = async () => {
    // Create an array of objects with the dynamic data for each person
    const dynamicDataArray =
      personTotal
        ?.filter((e: any) => e?.email === singleUser?.user?.email)
        ?.map(({ name, total }: any) => {
          const personAmount: any = personTotalAmounts[name] || 0;
          return {
            name,
            total,
            personAmount,
            expenseForMeal: parseFloat((average * total).toFixed(2)),
            paymentDifference: parseFloat(
              (personAmount - average * total).toFixed(2)
            ),
          };
        }) || [];

    // Create the dataToSave object including the dynamicDataArray
    const dataToSave = {
      userEmail: singleUser?.user?.email,
      totalBazar: totalBazar,
      totalMeal: totalMill,
      average: parseFloat(average),
      dynamicData: dynamicDataArray,
      // Add more dynamic data properties as needed
    };
    console.log(dataToSave);

    const response = await fetch("/api/report-card", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    });

    console.log(response);
  };

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
          const personAmount: any = personTotalAmounts[name] || 0;

          return (
            <>
              <div className="">
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

      <button onClick={handleButtonClick}>Save Data to Database</button>
    </div>
  );
};

export default ReportCard;
