import { Collections } from "@/components/Collections";
import { Hero } from "@/components/Hero";
import { menCollection } from "@/data/collections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men Collection",
};

export default function MenPage() {
  return (
    <>
      <Hero
        title="Men Collection"
        description="Discover curated pieces that embody heritage, craftsmanship, and quiet sophistication."
        className="bg-men"
      />
      <Collections collection={menCollection} />
    </>
  );
}
