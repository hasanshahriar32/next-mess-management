"use client";
import Container from "../ui/Container/container";
import { Subtitle, Title } from "../ui/Heading/Heading";
// import tours from "@/assets/data/tours";

const Explore = () => {
  // const { data, error, isLoading } = useGetServicesQuery(8)

  // if (error) return <>
  //     <div className="min-h-[90vh] flex justify-center items-center">
  //         data is not loaded
  //     </div>
  // </>

  return (
    <Container>
      <div className="">
        <Subtitle>Explore</Subtitle>
        <Title>Our Feature Tours</Title>
      </div>
      {/* {isLoading ? <>loading</> : <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {data?.data?.map(tour => <Card key={tour.id} tour={tour} />)}
            </div>} */}
    </Container>
  );
};

export default Explore;
