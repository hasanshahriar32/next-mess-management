"use client";
import { PrimaryButton } from "@/Components/ui/Buttons/PrimaryButton";
import Container from "@/Components/ui/Container/container";
import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useBazarAddMutation,
  useGetSingleBazarQuery,
  useUpdateBazarMutation,
} from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface BazarInterface {
  newBazar: string;
  newAmount: string;
  newName: string;
  newEmail: string;
  newMonth: string;
  newBazarStatus: boolean;
}

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

const EditMyBazar = ({ id }: any) => {
  const { data: singleBazar } = useGetSingleBazarQuery(id);
  console.log(singleBazar?.bazar?.bazarStatus);
  const {
    amount: myAmount,
    bazar: mySingleBazar,
    month: myMonth,
  } = singleBazar?.bazar ?? {};
  const { data } = useSession();
  const [bazar, setBazar] = useState(mySingleBazar);
  const [amount, setAmount] = useState(myAmount);
  const [month, setMonth] = useState(myMonth);
  const router = useRouter();

  const [updateBazar, { isError, isLoading, isSuccess, error }] =
    useUpdateBazarMutation();

  const resetForm = () => {
    setBazar("");
    setAmount("");
    setMonth("");
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "bazar") {
      setBazar(value);
    } else if (name === "amount") {
      setAmount(value);
    } else if (name === "month") {
      setMonth(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bazarInfo: BazarInterface = {
      newBazar: bazar,
      newAmount: amount,
      newMonth: month,
      newBazarStatus: false,
      newName: data?.user?.name ?? "",
      newEmail: data?.user?.email ?? "",
    };
    console.log(bazarInfo);
    try {
      const res = await updateBazar({
        id,
        updatedBazarData: {
          newBazar: bazarInfo.newBazar,
          newAmount: parseFloat(bazarInfo.newAmount),
          newName: bazarInfo.newName,
          newEmail: bazarInfo.newEmail,
          newMonth: bazarInfo.newMonth,
          newBazarStatus: bazarInfo?.newBazarStatus,
        },
      });
      console.log(res);
      if ("data" in res) {
        router.push("/dashboard/my-bazar");
        resetForm();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container>
      <Title className="my-8">Edit Bazar</Title>
      {isLoading ? (
        <>
          <div className="h-screen flex justify-center items-center ">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <select
              name="month"
              value={month}
              defaultValue={myMonth}
              onChange={handleInputChange}
              className="mb-5 select select-bordered w-full "
            >
              {months?.map((month) => {
                return (
                  <>
                    <option>{month}</option>
                  </>
                );
              })}
            </select>
            <textarea
              required
              name="bazar"
              value={bazar}
              defaultValue={mySingleBazar}
              onChange={handleInputChange}
              className="w-full mb-5 textarea textarea-bordered"
              placeholder="Bazar Details"
            ></textarea>
            <input
              type="text"
              required
              name="amount"
              value={amount}
              defaultValue={myAmount}
              onChange={handleInputChange}
              placeholder="Enter Bazar Amount"
              className="input input-bordered w-full mb-5"
            />
            <PrimaryButton disabled={isLoading}>Add Bazar</PrimaryButton>
          </form>
        </>
      )}

      {isSuccess && (
        <>
          <P>Bazar Succfully Add</P>
        </>
      )}
      {isError && (
        <>
          <P>There is An Error </P>
        </>
      )}
    </Container>
  );
};

export default EditMyBazar;
