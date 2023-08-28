"use client"
import Container from "@/Components/ui/Container/container";
import { ReactNode } from "react";
import AdminSidebar from "./Sidebar";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { status, data } = useSession();
  return (
    <div>
       {
        (status === "authenticated" && data?.user?.role==="admin" && data?.user?.role==="superAdmin") ? 
        (<div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Container>{children}</Container>
      </div>
      <AdminSidebar />
    </div>): 
    (<h2>Not Admin or SuperUser</h2>)
       }
    </div>
  );
};

export default Layout;
