"use client";

import Container from "@/Components/ui/Container/container";
import { P, Subtitle, Title } from "@/Components/ui/Heading/Heading";
import { useGetPostQuery } from "../features/post/postApi";

export default function Home() {
  const { data } = useGetPostQuery({});
  console.log(data);
  return (
    <>
      <Container>
        <Title className="min-h-[60vh]">this is title</Title>
        <Subtitle>this sub title</Subtitle>
        <P>this is Paramargah</P>
      </Container>
    </>
  );
}
