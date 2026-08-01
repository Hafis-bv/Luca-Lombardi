"use client";

import { Container } from "@/components/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { CollectionCard } from "@/components/CollectionCard";
import { collections } from "@/data/collections";
import { Collection } from "@/types/collection";
import { getPopularProducts } from "@/utils/products";

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
  };
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const popularCollections = collections.filter((col) => col.popular);
  const [products, setProducts] = useState<Collection[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await getPopularProducts();
        setProducts(res);
      } catch (err) {
        console.log(err);
      }
    }

    getProducts();
  }, []);

  return (
    <div className="bg-slate-800 text-white py-30">
      <Container className="flex flex-col text-center justify-center gap-4 sm:gap-8">
        <h1 className="text-3xl sm:text-5xl">Popular styles right now</h1>
        <p className="text-gray-200">Make our most beloved looks your own.</p>
        <div className="relative pt-10 px-5">
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={32}
            className="w-full flex justify-center mx-auto"
            slidesPerView={5}
            loop
            breakpoints={breakpoints}
          >
            {products.map((col) => (
              <SwiperSlide key={col.id}>
                <CollectionCard collection={col} />
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
