"use client";
import Image from "next/image";
import CountUp from "react-countup";
import Container from "../ui/Container/container";
import { P, Title } from "../ui/Heading/Heading";

const HeroSection = () => {
  return (
    <Container className="">
      <div className=" text-white h-[90vh]  ">
        <div className="md:px-0 flex-col  md:grid md:grid-cols-2 md:w-full  h-full flex  items-center justify-between ">
          <div className="col-span-1 md:mt-0 mt-14">
            <div className="mb-7">
              <span className="bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800 p-2 md:text-sm rounded-3xl text-white  h-10">
                Revolutionizing Mess Management
              </span>
            </div>
            <Title className="  mt-5 ">
              <span className="stroke-text text-5xl">
                Introducing Our Revolutionary
              </span>{" "}
              <br />
              <span className="text-5xl md:text-7xl ">Mess Management </span>
            </Title>
            <P className="py-6">
              Transform Events: Seamlessly Coordinate, Unleash Unparalleled
              Efficiency. Elevate Your Experience with Our Powerful Management
              Solution. Make Every Moment Count
            </P>
            <div className="flex justify-between mt-5 w-96">
              <div className="flex flex-col justify-center items-center">
                <h1 className="md:text-4xl text-2xl">
                  + <CountUp start={0} end={50} delay={0} duration={2} />
                </h1>
                <p>Total users </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="md:text-4xl text-2xl">
                  +<CountUp start={0} end={30} delay={0} duration={2} />
                </h1>
                <p>Students </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="md:text-4xl text-2xl">
                  + <CountUp start={0} end={20} delay={0} duration={2} />
                </h1>
                <p> Servant </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <Image
              width={500}
              height={500}
              src="/heroImage.svg"
              alt="hero iamge "
              className="h-96 w-96 md:h-[520px] md:w-auto"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
