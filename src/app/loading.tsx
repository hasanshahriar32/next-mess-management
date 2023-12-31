import React from "react";

export const loading = () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
    </div>
  );
};

export default loading;
