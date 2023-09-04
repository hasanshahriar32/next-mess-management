import UsersProfile from "@/Components/Dashboard/UsersProfile/UsersProfile";
import React from "react";
interface paramsInterface {
  params: {
    email: string;
  };
}
const page = ({ params }: paramsInterface) => {
  const { email } = params;
  return (
    <div>
      <UsersProfile email={email}></UsersProfile>
    </div>
  );
};

export default page;
