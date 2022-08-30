import React from "react";
import Slider from "react-slick";
import _ from "lodash";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from '@heroicons/react/outline';

const ProductListComponent = ({ title, products, isReverse } : any) => {
    const settings : any = {
        rows: 2,
        slidesPerRow: 1,
        dots: false,
        infinite: true,
        speed: 1500,
        autoplaySpeed: 4000,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 4,
        fade: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    rows: 1,
                    nextArrow: null,
                    prevArrow: null,
                    slidesPerRow: 2,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="shadow-3xl bg-white border border-slate-300 rounded-[10px]">
            <div className="h-full">
                <div className="h-full flex px-6 py-0 sm:py-0 md:py-6 justify-between items-center">
                    <div className="text-md w-full sm:text-md md:text-xl lg:text-4xl text-center sm:text-center md:text-left font-bold uppercase text-black">
                        {title}
                    </div>
                    <div className={`hidden sm:hidden md:block ${isReverse ? 'md:mr-0' : "md:mr-12"}`}>
                        <Link href={"https://doppelherz.vn/san-pham/"}>
                            <a target={"_blank"} className="text-md md:text-md lg:text-2xl text-center h-[36px] md:h-[36px] lg:h-[60px] w-[150px] md:w-[150px] lg:w-[307px] leading-[36px] mg:leading-[36px] lg:leading-[60px] font-medium shadow-md rounded-[10px] hover:bg-red-600 bg-[#C42726] text-white flex items-center justify-center">
                                Xem Thêm
                                <ArrowRightIcon className="ml-3 w-6 h-6 text-white font-medium" />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={`mx-auto md:pt-6 px-0 sm:px-0 md:px-6 py-0 sm:py-0 md:py-6 flex ${isReverse ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1/4 hidden sm:hidden md:hidden lg:block">
                        <div className="h-[96%] w-full relative">
                            <Image
                                src={"/Banner.webp"}
                                alt=""
                                layout="fill"
                                className="h-full w-[350px] overflow-hidden rounded-[10px]"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full lg:w-3/4 h-full px-0 sm:px-0 md:px-10">
                        <Slider {...settings}>
                            {_.map(products, (item, index) => {
                                return (
                                    <div key={index} className="px-1 sm:px-1 md:px-3 mb-4">
                                        <div className="w-full relative rounded-[0px] sm:rounded-[0px] md:rounded-[10px] text-center overflow-hidden pt-2 px-2 pb-4 bg-white border border-slate-300 block h-full shadow-lg cursor-pointer">
                                            <div style={{ backgroundImage: `url(https://sukien.doppelherz.vn/storage/${item?.image})` }} className="relative h-[120px] sm:h-[120px] md:h-[120px] lg:h-[200px] block text-center bg-no-repeat bg-contain sm:bg-contain md:bg-contain lg:md-cover bg-center"></div>
                                            <div className="bg-white text-center font-bold text-lg w-full pb-4">
                                                <h2 className="truncate text-sm sm:text-sm md:text-md lg:text-lg">{item?.name}</h2>
                                                <h3 className="text-xs sm:text-xs md:text-md lg:text-lg text-black">
                                                    {item?.price.toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}
                                                </h3>
                                            </div>
                                            <div className="flex justify-center">
                                                <a href={item?.link_product} className="hidden sm:hidden md:hidden lg:block text-sm sm:text-sm md:text-lg px-2 py-2 sm:px-2 sm:py-2 md:px-3 md:py-3 rounded-lg hover:bg-red-600 bg-red-500 text-white m-auto font-bold">
                                                    Mua Sản Phẩm
                                                </a>
                                                <a href={item?.link_product} className="block sm:block md:block lg:hidden text-sm sm:text-sm md:text-md lg:text-lg px-2 py-0 sm:px-2 sm:py-0 md:px-3 md:py-0 rounded-lg text-red-600 underline m-auto font-bold">
                                                    Mua Sản Phẩm
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListComponent;
