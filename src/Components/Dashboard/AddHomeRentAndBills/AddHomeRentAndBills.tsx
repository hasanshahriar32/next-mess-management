"use client";
import { PrimaryButton } from "@/Components/ui/Buttons/PrimaryButton";
import Container from "@/Components/ui/Container/container";
import { Title } from "@/Components/ui/Heading/Heading";
import React, { FormEvent, useState } from "react";
const AddHomeRentAndBills = () => {
  const [homeRent, setHomeRent] = useState("");
  const [bills, setBills] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Home Rent:", homeRent);
    console.log("Bills:", bills);
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
