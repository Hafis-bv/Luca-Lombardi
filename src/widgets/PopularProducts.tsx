"use client";

import { Container } from "@/components/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";

export function PopularProducts() {
  const breakpoints = {
    300: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
    1340: {
      slidesPerView: 5,
    },
  };
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="bg-slate-800 text-white py-30">
      <Container className="flex flex-col text-center justify-center gap-4 sm:gap-8">
        <h1 className="text-3xl sm:text-5xl">Popular styles right now</h1>
        <p className="text-gray-200">Make our most beloved looks your own.</p>
        <div className="relative pt-10 px-5">
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={32}
            className="w-full"
            slidesPerView={5}
            loop
            breakpoints={breakpoints}
          >
            {[...Array(10)].map((_, i) => (
              <SwiperSlide key={i}>
                <img
                  className="rounded-xl h-auto xl:h-100 w-full object-cover"
                  src="https://suitshop.com/_next/image/?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1025%2F3059%2Ffiles%2FeDUMhQAbyUawYwVX7j2SDGat_DSzadoofUOkwQu7vaA_1440x2000_crop_center.jpg%3Fv%3D1724863128&w=640&q=75"
                  alt="Suit"
                />
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm font-medium">Men's Olive Green Suit</p>
                  <span className="text-sm font-semibold">$378</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => swiper?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full cursor-pointer w-16 h-16 flex items-center justify-center shadow-xl hover:bg-gray-100 transition-colors"
          >
            <HiChevronLeft
              size={38}
              className="text-slate-800"
              strokeWidth={2}
            />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full cursor-pointer w-16 h-16 flex items-center justify-center shadow-xl hover:bg-gray-100 transition-colors"
          >
            <HiChevronRight
              size={38}
              className="text-slate-800"
              strokeWidth={2}
            />
          </button>
        </div>
      </Container>
    </div>
  );
}
