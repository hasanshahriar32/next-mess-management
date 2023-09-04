"use client";
import {
  useGetSingleBazarQuery,
  useGetSingleUserQuery,
} from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
  const { data } = useSession();
  console.log(data?.user);
  const sessionEmail: any = data?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(sessionEmail);
  console.log(singleUser);
  const navLinks = [
    {
      id: 1,
      path: "/dashboard",
      title: "Dashboard",
      icon: <FaUser />,
    },

    {
      id: 3,
      path: "/dashboard/bazar-dates",
      title: "Bazar Dates",
      icon: <FaUser />,
    },
    {
      id: 4,
      path: "/dashboard/add-bazar",
      title: "Add Bazar",
      icon: <FaUser />,
    },

    {
      id: 5,
      path: "/dashboard/my-bazar",
      title: "My Bazar",
      icon: <FaUser />,
    },
    {
      id: 6,
      path: "/dashboard/add-homerent-bills",
      title: "Add HomeRent & Bills",
      icon: <FaUser />,
    },

    {
      id: 12,
      path: "/dashboard/report-card",
      title: "Users Report Card",
      icon: <FaUser />,
    },
    {
      id: 14,
      path: "/dashboard/meal-count",
      title: "Meal Count",
      icon: <FaUser />,
    },
    {
      id: 5,
      path: "/dashboard/meal-plan",
      title: "Meal Plan",
      icon: <FaUser />,
    },
    {
      id: 15,
      path: "/dashboard/get-all-meal-count",
      title: "Get Meal Count",
      icon: <FaUser />,
    },
    {
      id: 16,
      path: "/dashboard/all-meal-count",
      title: "All Meal Count",
      icon: <FaUser />,
    },

    {
      id: 15,
      path: "/",
      title: "Home",
      icon: <FaUser />,
    },
  ];
  const pathname = usePathname();

  return (
    <div className="drawer-side z-50  border-r-2 border-gray-800">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className=" w-56  overflow-y-auto overflow-hidden text-base-content min-h-screen  bg-black ">
        <div className="py-6 ">
          <div className="mx-3 py-2 bg-blue-600 cursor-pointer">
            <p className="text-center text-white text-xl uppercase ">logo</p>
          </div>
        </div>
        {navLinks.map((link, index) => (
          <li key={index} className="relative">
            <Link href={link?.path}>
              <span
                className={`flex items-center gap-2 p-3 text-gray-200  hover:text-gray-100 duration-300 ${
                  pathname === link?.path ? "bg-blue-500" : "hover:bg-gray-700"
                }`}
              >
                {link?.icon}
                <span>{link?.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute  bottom-0 lg:flex py-4 px-2 justify-between w-full  border-t border-gray-800 ">
        <a href="#" className="flex items-center gap-2 ">
          <Image
            className="object-cover rounded-full h-7 w-7"
            src={data?.user?.image || ""}
            alt="avatar"
            width={30}
            height={30}
          />
          <span className="text-sm font-medium text-gray-200">
            {data?.user?.name}
          </span>
        </a>
        <button
          // onClick={handleLLogout}
          className="text-gray-500 transition-colors duration-200 rotate-180  rtl:rotate-0 hover:text-blue-500 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
