"use client";
import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect
import Container from "@/Components/ui/Container/container";
import AdminSidebar from "./Sidebar";
import { useSession } from "next-auth/react";
import { useGetSingleUserQuery } from "../features/bazar/bazarApi";

const Layout = ({ children }) => {
  const { status, data } = useSession();

  const userEmail = data?.user?.email;
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const sessionEmail = session?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(userEmail);

  useEffect(() => {
    if (singleUser !== undefined) {
      setLoading(false);
    }
  }, [singleUser]); // Update loading state when singleUser data changes

  console.log("single user", singleUser);
  const userRole = singleUser?.user?.role;
  console.log(data?.user?.email);
  const isAdmin = userRole === "admin" || userRole === "superAdmin";

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen text-info">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div>
          {status === "authenticated" && isAdmin ? (
            <div className="drawer lg:drawer-open">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <Container>{children}</Container>
              </div>
              <AdminSidebar />
            </div>
          ) : (
            <h2>Not Admin or SuperUser</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Layout;
