import { useAllUserQuery } from "@/app/features/bazar/bazarApi";
import React from "react";
import HomeRentAndBills from "../../../../Models/homeRentAndBillsSchema/homeRentAndBillsSchema";
import HostelMealTracker from "../meal-plan/page";

const FetchAllUsers = () => {
  const { data: allUsers, isLoading } = useAllUserQuery();
  console.log(allUsers?.users);

  if (!isLoading && allUsers?.users?.length > 0) {
    return (
      <div>
        {allUsers?.users?.map((user: any) => (
          <HostelMealTracker user={user} key={user._id}></HostelMealTracker>
        ))}
      </div>
    );
  }

  return null;
};

export default FetchAllUsers;
