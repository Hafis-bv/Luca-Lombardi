import { Hero } from "@/components/Hero";
import NewCollection from "@/components/NewCollection";
import {
  menCollection,
  sunglassesCollection,
  womenCollection,
} from "@/data/collections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Collection",
};

export default function NewCollectionPage() {
  return (
    <>
      <Hero
        title="New Collection"
        description="A new collection shaped by modern elegance — contemporary pieces for men and women, crafted with attention to detail and form."
        className="bg-new-collection"
      />
      <NewCollection delay={4500} title="For men" collections={menCollection} />
      <NewCollection
        delay={4500}
        title="For women"
        collections={womenCollection}
      />
      <NewCollection
        delay={4500}
        title="Sunglasses"
        collections={sunglassesCollection}
      />
    </>
  );
}
