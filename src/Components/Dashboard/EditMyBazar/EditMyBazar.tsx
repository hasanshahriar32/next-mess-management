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
  bazar: string;
  amount: string;
  name: string;
  email: string;
}

const EditMyBazar = ({ id }: any) => {
  const { data: singleBazar } = useGetSingleBazarQuery(id);
  const { amount: myAmount, bazar: mySingleBazar } = singleBazar?.bazar ?? {};
  const { data } = useSession();
  const [bazar, setBazar] = useState(mySingleBazar ?? "");
  const [amount, setAmount] = useState(myAmount?.toString() ?? "");
  const router = useRouter();

  const [UpdateBazar, { isError, isLoading, isSuccess, error }] =
    useUpdateBazarMutation();

  const resetForm = () => {
    setBazar("");
    setAmount("");
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "bazar") {
      setBazar(value);
    } else if (name === "amount") {
      setAmount(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bazarInfo: BazarInterface = {
      bazar,
      amount,
      name: data?.user?.name ?? "",
      email: data?.user?.email ?? "",
    };
    console.log(bazarInfo);

    try {
      const response = await UpdateBazar({
        id,
        ...bazarInfo,
        amount: parseFloat(amount), // Convert amount to a number
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

export default EditMyBazar;
