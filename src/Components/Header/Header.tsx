"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "../ui/Container/container";
import { P } from "../ui/Heading/Heading";
import { useGetSingleUserQuery } from "@/app/features/bazar/bazarApi";

// Define types for session and status
interface UserSession {
  user: {
    image: string | null;
  };
}

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
    <div className=" z-50  sticky top-0   bg-[#282a57] ">
      <div className=" border-b-2 border-gray-800 shadow-sm">
        <Container className="">
          <div className="navbar">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl">Logo</a>
            </div>
            <div className="flex-none gap-2">
              <div className="flex gap-5 items-center">
                <>
                  <Link href={"/"}>Home</Link>
                  <Link href={"/about"}>About</Link>
                  <Link href={"/contact"}>Contact</Link>
                  {!session?.user?.image && <Link href={"/login"}>Login</Link>}
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
                        src={singleUser?.user?.selectedImage}
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
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
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
