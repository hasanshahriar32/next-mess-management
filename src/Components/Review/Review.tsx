"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Container from "../ui/Container/container";
import { Subtitle, Title } from "../ui/Heading/Heading";
import Image from "next/image";
import "./review.css";

const Review = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      review:
        "Great product! Highly recommended! Impressive and exceeded my expectations! Fantastic purchase! So glad I bought it. Superb quality and excellent service.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      review:
        "I love it! Best purchase ever! Really happy with the quality. Amazing product, I can't recommend it enough! Incredible product. Love it!",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Alice Johnson",
      review:
        "Very satisfied with my order. Good value for money. Really happy with the quality. Superb quality and excellent service. Fantastic purchase!",
      rating: 4,
    },
    {
      id: 4,
      name: "Bob Williams",
      review:
        "Good value for money. Really happy with the quality. Amazing product, I can't recommend it enough! Fantastic purchase! So glad I bought it.",
      rating: 4,
    },
    {
      id: 5,
      name: "Eva Lee",
      review:
        "Really happy with the quality. Amazing product, I can't recommend it enough! Incredible product. Love it! Very satisfied with my order.",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Michael Brown",
      review:
        "Impressive and exceeded my expectations! Fantastic purchase! So glad I bought it. Superb quality and excellent service. Very satisfied with my order.",
      rating: 5,
    },
    {
      id: 7,
      name: "Olivia Davis",
      review:
        "Amazing product, I can't recommend it enough! Incredible product. Love it! Very satisfied with my order. Good value for money.",
      rating: 5,
    },
    {
      id: 8,
      name: "William Wilson",
      review:
        "Fantastic purchase! So glad I bought it. Superb quality and excellent service. Very satisfied with my order. Good value for money.",
      rating: 4.5,
    },
    {
      id: 9,
      name: "Sophia Taylor",
      review:
        "Superb quality and excellent service. Fantastic purchase! So glad I bought it. Impressive and exceeded my expectations! Good value for money.",
      rating: 5,
    },
    {
      id: 10,
      name: "James Miller",
      review:
        "Incredible product. Love it! Really happy with the quality. Amazing product, I can't recommend it enough! Good value for money.",
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden h-[500px] ">
      <Container className={"mt-20"}>
        <div className=" md:-ml-7">
          <Subtitle>Fans Love</Subtitle>
          <Title className={"text-3xl mb-10"}>
            Check out our Client reviews
          </Title>
        </div>
        <Slider {...settings}>
          {reviews.map((review) => (
            <div className="" key={review?.id}>
              <div className="m-2 p-2 bg-white rounded-md shadow-lg ">
                <p className="leading-loose text-gray-700 overflow-y-scroll chatScroll h-[140px]">
                  {review.review}
                </p>

                <div className="flex items-center mt-6 -mx-2">
                  <Image
                    height={50}
                    width={50}
                    className="object-cover mx-2 rounded-full w-14 h-14"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt=""
                  />

                  <div className="mx-2">
                    <h1 className="font-semibold text-gray-800 ">
                      {review.name}
                    </h1>
                    <p className="font-semibold text-gray-600 ">
                      {review.rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default Review;
