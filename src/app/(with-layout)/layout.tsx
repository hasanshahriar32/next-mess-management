import Header from "@/Components/Header/Header";
import React, { ReactNode } from "react";
import AuthProvider from "../Providers";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-9/12 mx-auto">
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
    </div>
  );
}

export default Layout;
