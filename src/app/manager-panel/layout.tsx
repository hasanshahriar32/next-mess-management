import Container from "@/Components/ui/Container/container";
import { ReactNode } from "react";
import AdminSidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Container>{children}</Container>
      </div>
      <AdminSidebar />
    </div>
  );
};

export default Layout;
