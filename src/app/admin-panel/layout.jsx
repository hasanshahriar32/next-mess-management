"use client";
import Container from "@/Components/ui/Container/container";
import { ReactNode } from "react";
import AdminSidebar from "./Sidebar";
import { useSession } from "next-auth/react";



const Layout = ( children ) => {
  const { status, data: session } = useSession();
  const userRole = session?.user?.role; // Fix here

  const isAdmin = userRole === "admin" || userRole === "superAdmin";

  return (
    <div>
      {status === "authenticated" && isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <Container>{children}</Container>
          </div>
          <AdminSidebar />
        </div>
      ) : (
        <h2>Not Admin or SuperUser</h2>
      )}
    </div>
  );
};

export default Layout;
