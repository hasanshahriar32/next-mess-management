import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import AuthProvider from "../Providers";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-9/12 mx-auto flex gap-10 font-semibold py-16">
      <AuthProvider>
        <Sidebar></Sidebar>
        {children}
      </AuthProvider>
    </div>
  );
};

export default Layout;
