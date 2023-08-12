import HostelMealTracker from "@/app/dashboard/meal-plan/page";
import React from "react";
import Container from "../ui/Container/container";
import { useGetPostQuery } from "@/app/features/post/postApi";

const About = () => {
  // const data = useGetPostQuery({});
  // console.log(data);
  return (
    <div>
      <Container>
        <HostelMealTracker></HostelMealTracker>
      </Container>
    </div>
  );
};

export default About;
