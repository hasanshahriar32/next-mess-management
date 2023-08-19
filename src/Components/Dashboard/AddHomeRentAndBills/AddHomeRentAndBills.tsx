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
  month: string;
}
import React, { FormEvent, useState } from "react";
const AddHomeRentAndBills = () => {
  const [homeRent, setHomeRent] = useState("");
  const [bills, setBills] = useState("");
  const [month, setMonth] = useState("");
  const { data } = useSession();
  const router = useRouter();

  const [AddHomeRentAndBills] = useAddHomeAndBillsMutation();
  const resetForm = () => {
    setHomeRent("");
    setBills("");
    setMonth("");
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const expensesInfo: HomeRentAndBillsInterface = {
      bills: parseFloat(bills),
      homeRent: parseFloat(homeRent),
      month,
      name: data?.user?.name ?? "",
      email: data?.user?.email ?? "",
    };
    console.log(expensesInfo);
    try {
      const response = await AddHomeRentAndBills(expensesInfo);
      console.log(response);
      if ("data" in response) {
        resetForm();
        router.push("/dashboard/add-homerent-bills");
      }
    } catch (error) {}
  };
  return (
    <div className="mt-16">
      <Container>
        <Title className="mb-5">Home Rent And Bills</Title>
        <form onSubmit={handleSubmit}>
          <select
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
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
          <input
            placeholder="HomeRent"
            value={homeRent}
            required
            onChange={(e) => setHomeRent(e.target.value)}
            className="input input-bordered w-full mb-5"
          ></input>
          <input
            placeholder="Bills"
            value={bills}
            required
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
