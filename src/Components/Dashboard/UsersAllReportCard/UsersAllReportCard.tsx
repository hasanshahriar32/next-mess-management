"use Client";

import React from "react";

const UsersAllReportCard = async () => {
  const reportCard = await fetch("http://localhost:3000/api/report-card");
  const data = await reportCard.json();
  console.log(data);
  return (
    <div>
      <h2>Report card</h2>
    </div>
  );
};

export default UsersAllReportCard;
