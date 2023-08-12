"use client";
import { signOut, useSession } from "next-auth/react";
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
    <div className="bg-base-100 border ">
      <Container className="">
        <div className="navbar ">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
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
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
    // <div className="sticky top-0 flex justify-between text-xl font-semibold py-10">
    //   <div>
    //     <h2>Mess Logo</h2>
    //   </div>
    //   <div className="flex gap-5 items-center">
    //     {status === "authenticated" ? (
    //       <>
    //         <Link href={"/"}>Home</Link>
    //         <Link href={"/about"}>About</Link>
    //         <Link href={"/dashboard"}>Dashboard</Link>
    //         {session?.user?.image && (
    //           <Image
    //             src={session.user.image}
    //             alt=""
    //             width={50}
    //             height={50}
    //             className="rounded-full"
    //           />
    //         )}
    //         <button onClick={handleSignOut}>Signout</button>
    //       </>
    //     ) : (
    //       <>
    //         <Link href={"/"}>Home</Link>
    //         <Link href={"/about"}>About</Link>
    //         <Link href={"/login"}>Login</Link>
    //       </>
    //     )}
    //   </div>
    //   <style jsx>{`
    //     .active-link {
    //       color: #00bcd4;
    //       font-weight: bold;
    //     }
    //   `}</style>
    // </div>
  );
};

export default Header;
