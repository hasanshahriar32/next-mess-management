import Cat from "@/Components/Cat/cat";
import Gallery from "@/Components/Gallery/Gallery";
import HeroSection from "@/Components/Home/HeroSection";
import Review from "@/Components/Review/Review";
import Services from "@/Components/services/Services";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full gap-5">
        <HeroSection />
        <Services />
        <Gallery />
        <Review />
        <Cat />
      </div>
    </>
  );
}
