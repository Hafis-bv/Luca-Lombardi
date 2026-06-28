"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { menCollection } from "@/data/collections";
import { CollectionCard } from "./CollectionCard";
import { Container } from "./Container";

interface NewCollectionProps {
  title: string;
}

export default function NewCollection({ title }: NewCollectionProps) {
  const newCollections = menCollection.filter((c) => c.isNew);

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
    <Container className="w-full min-w-0 py-12 sm:py-16 lg:py-20">
      <h3 className="mb-8 text-2xl font-semibold sm:mb-10">
        {title}
      </h3>

      <Swiper
        className="w-full min-w-0"
        slidesPerView={1}
        spaceBetween={12}
        breakpoints={breakpoints}
        loop
      >
        {newCollections.map((collection) => (
          <SwiperSlide key={collection.id}>
            <CollectionCard collection={collection} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}