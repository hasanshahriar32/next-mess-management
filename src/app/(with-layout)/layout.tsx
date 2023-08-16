import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
