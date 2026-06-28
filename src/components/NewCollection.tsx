"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { collections, menCollection } from "@/data/collections";
import { CollectionCard } from "./CollectionCard";
import { Container } from "./Container";

export default function NewCollection() {
  const newCollections = menCollection.filter((c) => c.isNew);

  return (
    <Container className="py-12 sm:py-16 lg:py-20 overflow-hidden">
      <h3 className="mb-8 text-center text-2xl font-semibold sm:mb-10">For</h3>

      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        loop={false}
        grabCursor
        watchOverflow
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        className="w-full max-w-full overflow-hidden"
      >
        {newCollections.map((col) => (
          <SwiperSlide key={col.id} className="min-w-0">
            <CollectionCard collection={col} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
