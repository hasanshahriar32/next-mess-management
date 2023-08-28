"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import MyProfile from "@/Components/Dashboard/MyProfile/MyProfile";
// import DashboardComponent from "@/Components/Dashboard/DashboardComponent";
import { useAppSelector } from "../hooks";

const Dashboard = () => {
  return (
    <div className="my-16">
      <MyProfile />
    </div>
  );
};

export default Dashboard;