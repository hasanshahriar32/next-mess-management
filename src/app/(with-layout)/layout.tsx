import Header from "@/Components/Header/Header";
import React, { ReactNode } from "react";
import AuthProvider from "../Providers";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-9/12 mx-auto">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
