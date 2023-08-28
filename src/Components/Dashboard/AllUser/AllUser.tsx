"use client";

import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useAllUserQuery,
  useDeleteUserMutation,
  useGetSingleUserQuery,
} from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const AllUser = () => {
  const { data: allUser, isError, isLoading, isSuccess } = useAllUserQuery();
  console.log(allUser?.users);
  const [DeleteUser] = useDeleteUserMutation();
  const { data: session } = useSession();
  const sessionEmail: any = session?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(sessionEmail);
  console.log(singleUser?.user);

  const handleRemove = async (id: any) => {
    const agree: any = window.confirm("Are You Sure? You Want To Delete.");
    if (agree) {
      try {
        await DeleteUser(id);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [month, setMonth] = useState("");
  let filteredUsers = allUser?.users;
  if (month !== "") {
    filteredUsers = filteredUsers?.filter((user: any) => user.month === month);
  }

  let content;
  if (isLoading && !isError) {
    content = (
      <div className="h-screen flex justify-center items-center ">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      </div>
    );
  } else if (!isLoading && isError && !allUser?.users) {
    content = <P>There is An Error</P>;
  } else if (!isLoading && !isError && allUser?.users?.length === 0) {
    content = <P>Bazar Not Found</P>;
  } else if (!isLoading && !isError && allUser?.users?.length > 0) {
    content = (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((data: any, index: any) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data?.name}</td>
                  <td>{data?.email}</td>
                  <td className="flex gap-5">
                    {singleUser?.user?.role === "Admin" ? (
                      <>
                        {" "}
                        <button>
                          <BiEdit className="text-xl"></BiEdit>
                        </button>
                        <button onClick={() => handleRemove(data?._id)}>
                          <AiOutlineDelete className="text-xl"></AiOutlineDelete>
                        </button>
                      </>
                    ) : (
                      <>
                        <P>Only Admin Can Take Action</P>
                      </>
                    )}
                  </td>
                  <td>
                    <Link href={`users-profile/${data?.email}`}>
                      User's Prodile
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="mt-16">
      <div className="flex justify-between my-5">
        <div>
          <Title>All Users</Title>
        </div>
        <div className="flex gap-5 items-center">
          <P>Filter By Month</P>
          <div>
            {/* <select
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-transparent border-2 border-white select select-bordered w-full"
            >
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select> */}

            <select
              name="month"
              required
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border-2 border-white select select-bordered w-full"
            >
              <option value="">Filter by Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default AllUser;
