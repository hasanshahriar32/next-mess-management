"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

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
  // Track session fetch status
  const { status, data: session } = useSession();
  console.log(session);
  const router = useRouter();

  // useEffect(() => {
  //   if (session === undefined) {
  //     router.refresh();
  //   }
  // }, [session, router]);

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <div className="sticky top-0 flex justify-between text-xl font-semibold py-10">
      <div>
        <h2>Mess Logo</h2>
      </div>
      <div className="flex gap-5 items-center">
        {status === "authenticated" ? (
          <>
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <button onClick={handleSignOut}>Signout</button>
          </>
        ) : (
          <>
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/login"}>Login</Link>
          </>
        )}
      </div>
      <style jsx>{`
        .active-link {
          color: #00bcd4;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Header;
