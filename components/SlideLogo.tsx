import React from "react";
import _ from "lodash";
import Slider from "react-slick";
import Image from "next/image";

const SlideLogo = () => {
  const dataLogo = [
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
    {
      image: '/98nguoiducbiet.webp'
    },
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 2500,
    autoplaySpeed: 3000,
    // autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div className="border bg-white shadow-2xl rounded-[8px] border-gray-400 py-8">
      <Slider {...settings}>
        {dataLogo.map((item, index) => {
          return (
            <div key={index} className='items-center justify-center w-full d-flex px-1'>
              <div className="p-4 border border-gray-400">
                <Image src={item.image} className='block text-center' width={150} height={150} alt="" />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  )
}
export default SlideLogo;