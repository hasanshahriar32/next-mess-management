import ReportCard from "@/Components/Dashboard/ReportCard/ReportCard";
import React from "react";

const page = ({ params }: any) => {
  const { email } = params;
  console.log(email);
  return (
    <div>
      <ReportCard email={email}></ReportCard>
    </div>
  );
};

export default page;
