import React, { useEffect } from "react";
import { P, Subtitle, Title } from "../ui/Heading/Heading";
import { useAppSelector } from "@/app/hooks";
import {
  useAllUserQuery,
  useGetSingleUserQuery,
} from "@/app/features/bazar/bazarApi";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";

const DashboardComponent = () => {
  const totalBazar = useAppSelector((state) => state.meal.totalBazarAmount);
  const totalMill = useAppSelector((state) => state.meal.grandTotal);
  console.log(totalMill);
  console.log(totalBazar);
  const average = (totalBazar / totalMill).toFixed(2);
  const { data: allUser, isLoading, isError, error } = useAllUserQuery();
  console.log(allUser?.users?.length);
  const { data: session } = useSession();
  const sessionEmail: any = session?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(sessionEmail);

  const handleRemove = () => {};
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
            <tr className="text-white">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser?.users?.map((data: any, index: any) => {
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
                        <button>
                          <AiOutlineDelete className="text-xl"></AiOutlineDelete>
                        </button>
                      </>
                    ) : (
                      <>
                        <P>Only Admin Can Take Action</P>
                      </>
                    )}
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
    <div>
      <Title>OverView</Title>
      <div className="grid grid-cols-4 gap-10 my-10">
        <div className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-6 font-semibold rounded-lg">
          <Subtitle>Total User</Subtitle>
          <P className="text-white">{allUser?.users?.length}</P>
        </div>

        <div className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-6 font-semibold rounded-lg">
          <Subtitle>Total Bazar</Subtitle>
          <P className="text-white">{totalBazar} BDT</P>
        </div>
        <div className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-6 font-semibold rounded-lg">
          <Subtitle>Total Mill</Subtitle>
          <P className="text-white">{totalMill}</P>
        </div>
        <div className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-6 font-semibold rounded-lg">
          <Subtitle>Mill Rate</Subtitle>
          <P className="text-white">{average} BDT</P>
        </div>
      </div>
      <div>
        <P className="mb-5">All Users</P>
        <div className="grid grid-cols-2 gap-10">
          <div className="border-2 border-white rounded-lg px-6 py-3">
            {content}
          </div>
          <div>
            <h2>Graph</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
