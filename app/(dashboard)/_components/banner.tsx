"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  const data = [
    {
      id: 1,
      url: "https://cdn.pixabay.com/photo/2016/09/01/19/53/pocket-watch-1637396_1280.jpg",
    },
    {
      id: 2,
      url: "https://cdn.pixabay.com/photo/2016/03/19/09/42/vintage-1266412_1280.jpg",
    },
  ];
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{ delay: 3000 }}
        className="h-80 w-full"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Image
              src={item.url}
              alt="banner"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="custom-prev absolute left-2 top-[40%] z-10 bg-black text-white p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300">
        <ChevronLeft />
      </button>
      <button className="custom-next absolute right-2 top-[40%] z-10 bg-black text-white p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300">
        <ChevronRight />
      </button>
    </div>
  );
};

export default Banner;
