"use client";

import { P, Title } from "@/Components/ui/Heading/Heading";
import { useGetSingleUserQuery } from "@/app/features/bazar/bazarApi";
import Image from "next/image";
import React from "react";
import MyBazar from "../MyBazar/MyBazar";
import MyHomeRentAndBills from "../MyHomeRentAndBills/MyHomeRentAndBills";

const UsersProfile = ({ email }: any) => {
  const { data: singleUser } = useGetSingleUserQuery(email);
  console.log("single user", singleUser);
  return (
    <div className="my-16  ">
      <div className="flex gap-10 items-center">
        <div>
          <Image
            src={singleUser?.user?.selectedImage}
            alt=""
            width={300}
            height={300}
            className="rounded-full"
          ></Image>
        </div>
        <div>
          <Title>{singleUser?.user?.name}</Title>
          <P>Email : {singleUser?.user?.email}</P>
          <P>Personal Phone Number : {singleUser?.user?.personalNumber}</P>
          <P>Gurdian Number : {singleUser?.user?.parentNumber}</P>
          <P>Blood Group : {singleUser?.user?.bloodGroup}</P>
          <P>Member Created : {singleUser?.user?.month}</P>
          <P>Relagious : {singleUser?.user?.religious}</P>
          <P>National Id Card Number : {singleUser?.user?.religious}</P>
        </div>
      </div>
      <div className="">
        <MyBazar></MyBazar>
        <MyHomeRentAndBills></MyHomeRentAndBills>
      </div>
    </div>
  );
};

export default UsersProfile;
