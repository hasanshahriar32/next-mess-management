import Header from "@/Components/Header/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
