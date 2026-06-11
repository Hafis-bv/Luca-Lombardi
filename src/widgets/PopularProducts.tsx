"use client";

import { Container } from "@/components/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export function PopularProducts() {
  return (
    <div className="bg-slate-800 text-white py-30">
      <Container className="flex flex-col text-center justify-center gap-4 sm:gap-8">
        <h1 className="text-3xl sm:text-5xl">Popular styles right now</h1>
        <p className="text-gray-200">Make our most beloved looks your own.</p>
        <div>
          <Swiper spaceBetween={32} className="w-full" slidesPerView={5} loop>
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
        </div>
      </Container>
    </div>
  );
}
