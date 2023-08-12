"use client";

import Container from "@/Components/ui/Container/container";
import { P, Subtitle, Title } from "@/Components/ui/Heading/Heading";

export default function Home() {
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
