"use client";

import { PrimaryButton } from "@/Components/ui/Buttons/PrimaryButton";
import Container from "@/Components/ui/Container/container";
import { Title } from "@/Components/ui/Heading/Heading";
import { useGetPostQuery } from "@/app/features/post/postApi";
import { useSession } from "next-auth/react";
import React, { useState, ChangeEvent, FormEvent } from "react";

const AddBazar = () => {
  const { data: post } = useGetPostQuery({});
  console.log(post);
  const { data } = useSession();
  console.log(data?.user?.name);
  const [bazar, setBazar] = useState("");
  const [amount, setAmount] = useState("");

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic here to use the bazar and amount values
    console.log({
      bazar,
      amount,
      name: data?.user?.name,
      email: data?.user?.email,
    });
  };

  return (
    <Container>
      <Title className="my-8">Add Bazar</Title>
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
        <PrimaryButton>Add Bazar</PrimaryButton>
      </form>
    </Container>
  );
};

export default AddBazar;
