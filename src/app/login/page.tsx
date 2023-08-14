import Login from "@/Components/Login/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/_nextauth";
import React from "react";

const page = async () => {
  // const session = await getServerSession(authOptions);
  // if (session) redirect("/dashboard");
  return (
    <div>
      <Login></Login>
    </div>
  );
};

export default page;
