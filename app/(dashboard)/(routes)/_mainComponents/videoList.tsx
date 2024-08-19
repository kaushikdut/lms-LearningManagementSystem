"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./card";
import { data } from "./data";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const VideoList = () => {
  console.log(data);
  return (
    <div className="w-full h-auto flex relative my-10">
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={5}
        navigation={{
          nextEl: ".list-next",
          prevEl: ".list-prev",
        }}
        className="z-1"
      >
        {data?.map((item) => (
          <SwiperSlide className="z-0">
            <Card
              key={item.id}
              title={item.title}
              thumbnailUrl={item.thumbnailUrl}
              author={item.author}
              price="₹1,999"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="list-prev absolute left-2 top-[40%] z-10 bg-black text-white p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300">
        <ChevronLeft />
      </button>
      <button className="list-next absolute right-2 top-[40%] z-10 bg-black text-white p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300">
        <ChevronRight />
      </button>
    </div>
  );
};

export default VideoList;
