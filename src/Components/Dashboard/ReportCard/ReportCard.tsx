"use client";
import { P, Subtitle, Title } from "@/Components/ui/Heading/Heading";
import {
  useAddReportCardMutation,
  useGetBazarQuery,
  useGetSingleHomeRentAndBillsQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/app/features/bazar/bazarApi";
import { useAppSelector } from "@/app/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ReportCard = ({ email: userEmail }: any) => {
  const { data: singleUser } = useGetSingleUserQuery(userEmail);
  console.log(singleUser?.user);
  const router = useRouter();
  const [AddReportCard] = useAddReportCardMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data: SingleHomeRentAndBills } =
    useGetSingleHomeRentAndBillsQuery(userEmail);
  console.log(SingleHomeRentAndBills?.expenses);
  // const { name, email } = singleUser?.user;
  const totalBazar = useAppSelector(
    (state: any) => state.meal.totalBazarAmount
  );
  const totalMill = useAppSelector((state: any) => state.meal.grandTotal);
  const personTotal = useAppSelector((state: any) => state.meal.personTotals);
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
  const handleButtonClick = async () => {
    const personData = personTotal.find((person: any) => {
      return person.email === singleUser?.user?.email;
    });

    if (!personData) {
      console.log("Person data not found");
      return;
    }
    // Create an array of objects with the dynamic data for each person
    const dynamicDataArray = personData.meals.map(({ name, total }: any) => {
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
    });

    // Create the dataToSave object including the dynamicDataArray
    const dataToSave = {
      userEmail: singleUser?.user?.email,
      totalBazar: parseFloat(totalBazar),
      totalMeal: parseFloat(totalMill),
      month: month,
      homeRent: parseFloat(SingleHomeRentAndBills?.expenses?.homeRent),
      bills: parseFloat(SingleHomeRentAndBills?.expenses?.bills),
      average: parseFloat(average),
      dynamicData: dynamicDataArray,
      image: singleUser?.user?.selectedImage,
    };
    console.log(dataToSave);

    try {
      const res = await AddReportCard(dataToSave);
      console.log(res);

      if ("data" in res) {
        // const result = await updateUser({
        //   id: singleUser?.user?._id,
        //   updatedUser: { newReportCardStatus: true }, // Change the property you want to update
        // });
        // console.log(result);
        //router.push("/dashboard/users-report-card");
      }
    } catch (error) {
      console.log("Report Creating Failed");
    }
  };

  return (
    <div className="my-16">
      <Title className="mb-3">
        Report Card For ,{" "}
        <span className="text-[#06B6D4]">{singleUser?.user?.name}</span>
      </Title>
      <div className="flex gap-10">
        <div>
          {" "}
          <P>Email : {singleUser?.user?.email}</P>
          <P>Home Rent : {SingleHomeRentAndBills?.expenses?.homeRent} BDT</P>
          <P>others Bills : {SingleHomeRentAndBills?.expenses?.bills} BDT</P>
          <P>Total Bazar : {totalBazar} BDT</P>
          <P>Total Meal : {totalMill}</P>
        </div>
        <div>
          {" "}
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
        </div>
      </div>

      <div className="flex gap-10 items-center">
        <div>
          <select
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-transparent border-2 my-5 border-white select select-bordered w-full"
          >
            {months.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="text-white  bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold rounded-lg"
            onClick={handleButtonClick}
          >
            Create Report Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
