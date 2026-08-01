"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { menCollection } from "@/data/collections";
import { CollectionCard } from "./CollectionCard";
import { Container } from "./Container";
import { Collection } from "@/types/collection";
import { Autoplay } from "swiper/modules";

interface NewCollectionProps {
  title: string;
  collections: Collection[];
  delay: number;
}

export default function NewCollection({
  title,
  collections,
  delay,
}: NewCollectionProps) {
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  return (
    <Container className="w-full min-w-0 py-12 sm:py-14 lg:py-18">
      <h3 className="mb-8 text-2xl font-semibold sm:mb-10">{title}</h3>

      <Swiper
        modules={[Autoplay]}
        className="w-full min-w-0"
        slidesPerView={1}
        spaceBetween={12}
        breakpoints={breakpoints}
        loop
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
      >
        {collections.map((collection) => (
          <SwiperSlide key={collection.id}>
            <CollectionCard collection={collection} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
