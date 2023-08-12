import { PrimaryButton } from "@/Components/ui/Buttons/PrimaryButton";
import Container from "@/Components/ui/Container/container";
import { Title } from "@/Components/ui/Heading/Heading";
import React from "react";

const page = () => {
  return (
    <div>
      <Container>
        <Title className="my-8">Add Bazar</Title>
        <form>
          <textarea
            className=" w-full mb-5 textarea textarea-bordered"
            placeholder="Bazar Details"
          ></textarea>
          <input
            type="text"
            placeholder="Enter Bazar Amount"
            className="input input-bordered w-full mb-5 "
          />
          <PrimaryButton>Add Bazar</PrimaryButton>
        </form>
      </Container>
    </div>
  );
};

export default page;
