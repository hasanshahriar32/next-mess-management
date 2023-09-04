"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Container from "../ui/Container/container";
import { P } from "../ui/Heading/Heading";
import { useGetSingleUserQuery } from "@/app/features/bazar/bazarApi";
import Image from "next/image";

// Define types for session and status
// interface UserSession {
//   user: {
//     image: string | null;
//   };
// }

type SessionStatus = "authenticated" | "loading" | "unauthenticated";

// Define header component props
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { status, data: session } = useSession();
  const sessionEmail: any = session?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(sessionEmail);
  console.log(session);
  console.log(singleUser);

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <div className=" z-50 bg-[#282a57] w-full">
      <div className=" border-b-2 border-gray-800 shadow-sm">
        <Container className="">
          <div className="navbar">
            <div className="flex-1">
              <Link href={"/"} className="btn btn-ghost normal-case text-xl">
                <Image
                  src="https://i.ibb.co/PGNP90L/Green-Yellow-White-Modern-Farm-House-Logo-4.png"
                  height={50}
                  width={50}
                  alt="logo"
                />
                <p className="hidden md:flex">Mess Management</p>
              </Link>
            </div>
            <div className="flex-none gap-2">
              <div className="flex gap-5 items-center">
                <>
                  <Link href={"/"}>Home</Link>
                  <Link href={"/about"}>Meal List</Link>
                  <Link href={"/contact"}>Contact</Link>
                  {!session?.user?.email && <Link href={"/login"}>Login</Link>}
                </>
              </div>
              <div className="dropdown dropdown-end">
                {session?.user?.name && (
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <Image
                        src={
                          singleUser?.user?.selectedImage ||
                          `https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png`
                        }
                        alt=""
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                  </label>
                )}
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black rounded-box w-52"
                >
                  <li>
                    <Link href={"/profile"}>Profile</Link>
        
                  </li>
                  <li>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </li>
                  <li>
                    <Link href={"/admin-panel"}>Admin Panel</Link>
                  </li>
                  <li>
                    <Link href={"/manager-panel"}>Manager Panel</Link>
                  </li>
                  <li>
                    <a onClick={handleSignOut}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
