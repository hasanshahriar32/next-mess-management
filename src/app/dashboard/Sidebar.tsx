"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const sideBar = [
    {
      id: 1,
      path: "/dashboard",
      title: "Dashboard",
    },
    {
      id: 2,
      path: "/dashboard/add-user",
      title: "Add User",
    },
    {
      id: 3,
      path: "/dashboard/meal-plan",
      title: "Meal Plan",
    },
    {
      id: 4,
      path: "/dashboard/bazar-dates",
      title: "Bazar Dates",
    },
    {
      id: 5,
      path: "/",
      title: "Home",
    },
  ];
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="">
      {sideBar.map((s) => {
        return (
          <>
            <ul className="list-none ">
              <li className={pathname === s.path ? "active-link" : ""}>
                <Link href={s.path}>{s.title}</Link>
              </li>
            </ul>
            <style jsx>{`
              .active-link {
                color: #00bcd4; // Set your desired active link color here
                font-weight: bold; // Optional: You can add more styles if needed
              }
            `}</style>
          </>
        );
      })}
    </div>
  );
};

export default Sidebar;
