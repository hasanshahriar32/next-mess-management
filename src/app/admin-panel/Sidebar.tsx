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

const AdminSidebar = () => {
  const { data } = useSession();
  console.log(data?.user);
  const sessionEmail: any = data?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(sessionEmail);
  console.log(singleUser);
  const navLinks = [
    {
      id: 1,
      path: "/admin-panel",
      title: "Dashboard",
      icon: <FaUser />,
    },
    {
      id: 10,
      path: "/admin-panel/add-user",
      title: "Add User",
      icon: <FaUser />,
    },
    {
      id: 4,
      path: "/admin-panel/all-user",
      title: "Manage Users",
      icon: <FaUser />,
    },
    {
      id: 2,
      path: "/admin-panel/select-managers",
      title: "Select Managers",
      icon: <FaUser />,
    },
    {
      id: 3,
      path: "/admin-panel/manage-managers",
      title: "Manage Managers",
      icon: <FaUser />,
    },

    {
      id: 5,
      path: "/admin-panel/manage-admins",
      title: "Manage Admins",
      icon: <FaUser />,
    },
    {
      id: 6,
      path: "/admin-panel/all-homerent-bills",
      title: "Homerent Bills",
      icon: <FaUser />,
    },
    {
      id: 7,
      path: "/admin-panel/select-rent-and-bills",
      title: "Select Bills",
      icon: <FaUser />,
    },
    {
      id: 30,
      path: "/",
      title: "Home",
      icon: <FaUser />,
    },
  ];
  const pathname = usePathname();

  return (
    <div className="drawer-side z-50  border-r-2 border-gray-800">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className=" w-56  h-full  text-base-content bg-black ">
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
      <div className="hidden absolute bottom-0 lg:flex py-4 px-2 justify-between w-full  border-t border-gray-800 ">
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

export default AdminSidebar;
