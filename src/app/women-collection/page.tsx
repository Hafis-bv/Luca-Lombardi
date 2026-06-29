import { Collections } from "@/components/Collections";
import { Hero } from "@/components/Hero";
import { womenCollection } from "@/data/collections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women Collection",
};

export default function WomenPage() {
  return (
    <>
      <Hero
        title="Women Collection"
        description="Discover curated pieces that embody heritage, craftsmanship, and quiet sophistication."
        className="bg-women"
      />
      <Collections collection={womenCollection} />
    </>
  );
}
