"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const navLinks = [
    {
      id: 1,
      path: "/",
      title: "Home",
    },
    {
      id: 2,
      path: "/about",
      title: "about",
    },
    {
      id: 3,
      path: "/login",
      title: "Login",
    },

    {
      id: 4,
      path: "/dashboard",
      title: "Dashboard",
    },
  ];
  return (
    <div className="sticky top-0 flex justify-between text-xl font-semibold py-10">
      <div>
        <h2>Mess Logo</h2>
      </div>
      <div className="flex gap-5 items-center">
        {navLinks.map((navlink) => {
          return (
            <>
              <ul>
                <li>
                  <Link href={navlink.path}>
                    <span
                      className={pathname === navlink.path ? "active-link" : ""}
                    >
                      {navlink.title}
                    </span>
                  </Link>
                </li>
              </ul>
            </>
          );
        })}
      </div>
      <style jsx>{`
        .active-link {
          color: blue; // Set your desired active link color here
          font-weight: bold; // Optional: You can add more styles if needed
        }
      `}</style>
    </div>
  );
};

export default Header;
