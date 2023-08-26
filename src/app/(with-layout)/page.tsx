import Cat from "@/Components/Cat/cat";
import Gallery from "@/Components/Gallery/Gallery";
import HeroSection from "@/Components/Home/HeroSection";
import Review from "@/Components/Review/Review";
import { StreamlinedExperience } from "@/Components/Streamlined/Streamlined";
import Pipe from "@/Components/Streamlined/pipe";
import Services from "@/Components/services/Services";

export default function Home() {
  return (
    <>
      <div className="flex flex-col max-w-[100vw] gap-5">
        <HeroSection />
        <Services />
        <Gallery />
        <div className="max-w-full">
          {/* <StreamlinedExperience /> */}
        </div>
        <Review />
        {/* <Pipe /> */}
        <Cat />
      </div>
    </>
  );
}
