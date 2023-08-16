"use client";
import { PrimaryButton } from "@/Components/ui/Buttons/PrimaryButton";
import Container from "@/Components/ui/Container/container";
import { Title } from "@/Components/ui/Heading/Heading";
import { useAddHomeAndBillsMutation } from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HomeRentAndBillsInterface {
  bills: number;
  homeRent: number;
  name: string;
  email: string;
}
import React, { FormEvent, useState } from "react";
const AddHomeRentAndBills = () => {
  const [homeRent, setHomeRent] = useState("");
  const [bills, setBills] = useState("");
  const { data } = useSession();
  const router = useRouter();

  const [AddHomeRentAndBills] = useAddHomeAndBillsMutation();
  const resetForm = () => {
    setHomeRent("");
    setBills("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Home Rent:", homeRent);
    console.log("Bills:", bills);
    const expensesInfo: HomeRentAndBillsInterface = {
      bills: parseFloat(bills),
      homeRent: parseFloat(homeRent),
      name: data?.user?.name ?? "",
      email: data?.user?.email ?? "",
    };
    console.log(expensesInfo);
    try {
      const response = await AddHomeRentAndBills(expensesInfo);
      console.log(response);
      if ("data" in response) {
        resetForm();
      }
    } catch (error) {}
  };
  return (
    <div className="mt-16">
      <Container>
        <Title className="mb-5">Home Rent And Bills</Title>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="HomeRent"
            value={homeRent}
            onChange={(e) => setHomeRent(e.target.value)}
            className="input input-bordered w-full mb-5"
          ></input>
          <input
            placeholder="Bills"
            value={bills}
            onChange={(e) => setBills(e.target.value)}
            className="input input-bordered w-full mb-5"
          ></input>
          <PrimaryButton>Submit</PrimaryButton>
        </form>
      </Container>
    </div>
  );
};

export default AddHomeRentAndBills;
