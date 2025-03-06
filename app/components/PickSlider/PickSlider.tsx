"use client";
import React from "react";
import Slider, { Settings } from "react-slick";
import { mediaType } from "@/app/types/media.type";
export default function PickSlider({ medias }: { medias: mediaType[] }) {
  const settings: Settings = {
    dots: true,
    arrows: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    centerMode: false,

    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container bg-black">
      <Slider {...settings}>
        {medias.map((media) => (
          <div key={media._id} className="flex items-center justify-center">
            <img src={media.path} className="object-fill" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
