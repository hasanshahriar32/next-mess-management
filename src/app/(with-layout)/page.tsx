"use client";
import Container from "@/Components/ui/Container/container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status, data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "authenticated") {
      <h2>Loading.......</h2>;
    }
  }, [session, router, status]);

  return (
    <Container className="">
      <h1>Home</h1>
    </Container>
  );
}
