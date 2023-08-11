"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status, data: session } = useSession();
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    if (status !== "authenticated") {
      <h2>Loading.......</h2>;
    }
  }, [session, router, status]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
