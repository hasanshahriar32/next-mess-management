"use client";
import { PrimaryButton } from "@/Components/ui/Buttons/PrimaryButton";
import Container from "@/Components/ui/Container/container";
import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useBazarAddMutation,
  useGetBazarQuery,
} from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface BazarInterface {
  bazar: string;
  amount: string;
  name: string;
  email: string;
  month: string;
  bazarStatus: boolean;
}

const AddBazar = () => {
  const { data: Allbazar } = useGetBazarQuery();
  console.log(Allbazar);
  const { data } = useSession();
  const [bazar, setBazar] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const router = useRouter();

  const [BazarAdd, { data: Bazar, isError, isLoading, error, isSuccess }] =
    useBazarAddMutation();

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
      bazar,
      amount,
      month,
      bazarStatus: false,
      name: data?.user?.name ?? "",
      email: data?.user?.email ?? "",
    };
    console.log(bazarInfo);
    try {
      const response = await BazarAdd({
        ...bazarInfo,
        amount: parseFloat(bazarInfo.amount), // Convert amount to a number
      });

      if ("data" in response) {
        // Check if "data" property exists in the response
        router.push("/dashboard/my-bazar");
        resetForm();
      } else if ("error" in response) {
        // Check if "error" property exists in the response
        console.log("Bazar addition failed.");
      }
    } catch (error) {
      console.log("error", error);
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

  return (
    <Container>
      <Title className="my-8">Add Bazar</Title>
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
              onChange={handleInputChange}
              className="w-full mb-5 textarea textarea-bordered"
              placeholder="Bazar Details"
            ></textarea>

            <input
              type="text"
              required
              name="amount"
              value={amount}
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

export default AddBazar;
