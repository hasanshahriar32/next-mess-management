"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import DashboardComponent from "@/Components/Dashboard/DashboardComponent";
import { useAppSelector } from "../hooks";

const Dashboard = () => {
  return (
    <div className="my-16">
      <DashboardComponent></DashboardComponent>
    </div>
  );
};

export default Dashboard;
