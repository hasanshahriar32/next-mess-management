"use client";
import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useGetBazarQuery,
  useRemoveBazarMutation,
} from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";

const MyBazar = () => {
  const { data: bazarData } = useGetBazarQuery();
  const { data: session } = useSession();
  const [RemoveBazar, { isError, isLoading, isSuccess, error }] =
    useRemoveBazarMutation();

  // Calculate the total amount of your bazar entries
  const myBazarEntries = bazarData?.bazars?.filter(
    (entry: any) => entry.email === session?.user?.email
  );
  console.log(myBazarEntries);
  const totalAmount = myBazarEntries?.reduce(
    (total: number, entry: any) => total + entry.amount,
    0
  );

  const handleRemove = (id: any) => {
    console.log("delete", id);
    const agree = window.confirm("Are You Sure ? You Want To Delete");
    if (agree && id) {
      RemoveBazar(id);
    }
  };

  return (
    <div className="mt-16">
      <Title className="mb-5">My Bazar</Title>
      {myBazarEntries?.length > 0 ? (
        <>
          {" "}
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th></th>
                  <th>Bazar</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myBazarEntries?.map((entry: any, index: number) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{entry?.bazar}</td>
                    <td>{entry?.updatedAt}</td>
                    <td>{entry?.amount}</td>
                    <td className="flex gap-5">
                      <Link href={`/dashboard/edit-my-bazar/${entry?._id}`}>
                        <button>
                          <BiEdit className="text-xl cursor-pointer"></BiEdit>
                        </button>
                      </Link>
                      <button onClick={() => handleRemove(entry?._id)}>
                        <AiOutlineDelete className="text-xl cursor-pointer"></AiOutlineDelete>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-end me-16">
            Total Amount: {totalAmount} {/* Display the total amount */}
          </p>
        </>
      ) : (
        <>
          <P>You Didn't Bazar Yet</P>
        </>
      )}
    </div>
  );
};

export default MyBazar;
