"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  console.log(session);

  // if (!session) {
  //   // If the user is not authenticated, redirect to login page
  //   router.push("/login");
  //   return null;
  // }

  if (status === "authenticated") {
    return (
      <div>
        <h2>ADMIN PANEL</h2>
      </div>
    );
  }

  return null; // Return null for other cases (loading or unauthenticated)
};

export default Dashboard;
