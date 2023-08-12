"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "../ui/Container/container";

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

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <div className="bg-base-100 border-b-2 shadow-sm sticky top-0">
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
                {!session?.user?.image && <Link href={"/login"}>Login</Link>}
              </>
            </div>
            <div className="dropdown dropdown-end">
              {session?.user?.image && (
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src={session?.user.image}
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
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
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
                  <a onClick={handleSignOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
