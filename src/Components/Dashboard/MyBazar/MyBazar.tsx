"use client";
import { P, Title } from "@/Components/ui/Heading/Heading";
import { useGetBazarQuery } from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import React from "react";

const MyBazar = () => {
  const { data: bazarData } = useGetBazarQuery();
  const { data: session } = useSession();

  // Calculate the total amount of your bazar entries
  const myBazarEntries = bazarData?.bazars?.filter(
    (entry: any) => entry.email === session?.user?.email
  );
  console.log(myBazarEntries);
  const totalAmount = myBazarEntries?.reduce(
    (total: number, entry: any) => total + entry.amount,
    0
  );

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
                </tr>
              </thead>
              <tbody>
                {myBazarEntries?.map((entry: any, index: number) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{entry?.bazar}</td>
                    <td>{entry?.updatedAt}</td>
                    <td>{entry?.amount}</td>
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
