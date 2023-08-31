"use client";

import { useGetBazarQuery } from "@/app/features/bazar/bazarApi";
export const GetTotalBazarAndPersonTotalBazar = () => {
  const { data: allBazar } = useGetBazarQuery();
  const bazarFilterData = allBazar?.bazars?.filter(
    (bazar: any) => bazar?.bazarStatus === true
  );

  let totalBazarAmount: any = 0;
  let personToTotalAmount: any = {};

  if (bazarFilterData && bazarFilterData.length > 0) {
    totalBazarAmount = bazarFilterData.reduce(
      (sum: any, bazar: any) => sum + bazar.amount,
      0
    );
    bazarFilterData.forEach((bazar: any) => {
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
};
