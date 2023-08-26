import Image from "next/image";
import img1 from "../../../public/images/gallery-01.jpg";
import img2 from "../../../public/images/gallery-02.jpg";
import img3 from "../../../public/images/gallery-03.jpg";
import img4 from "../../../public/images/gallery-04.jpg";
import img5 from "../../../public/images/gallery-05.jpg";
import img6 from "../../../public/images/gallery-06.jpg";
import img7 from "../../../public/images/gallery-07.jpg";
import Container from "../ui/Container/container";
import { Subtitle, Title } from "../ui/Heading/Heading";

const Gallery = () => {
  return (
    <Container>
      <div className="">
        <Subtitle>Gallery</Subtitle>
        <Title className={"text-3xl mb-10"}>
          Check out our some best rooms
        </Title>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg hover:scale-95 duration-300 cursor-pointer"
              src={img1}
              alt=""
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg hover:scale-95 duration-300 cursor-pointer"
              src={img3}
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg hover:scale-95 duration-300 cursor-pointer"
              src={img2}
              alt=""
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg hover:scale-95 duration-300 cursor-pointer"
              src={img4}
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg hover:scale-95 duration-300 cursor-pointer"
              src={img5}
              alt=""
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg hover:scale-95 duration-300 cursor-pointer"
              src={img6}
              alt=""
            />
          </div>
          <div></div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg hover:scale-95 duration-300 cursor-pointer"
              src={img7}
              alt=""
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg hover:scale-95 duration-300 cursor-pointer"
              src={img2}
              alt=""
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Gallery;
