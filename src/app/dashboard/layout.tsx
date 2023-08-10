import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-9/12 mx-auto flex gap-10 font-semibold py-16">
      <Sidebar></Sidebar>
      {children}
    </div>
  );
};

export default Layout;
