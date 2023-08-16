// YourPage.tsx
import EditMyBazar from "@/Components/Dashboard/EditMyBazar/EditMyBazar";
import React from "react";
import { useRouter } from "next/router";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { id } = params;
  console.log("id", id);

  return (
    <div>
      <EditMyBazar id={id}></EditMyBazar>
    </div>
  );
};

export default Page;
