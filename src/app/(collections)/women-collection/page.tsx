import { Collections } from "@/components/Collections";
import { Hero } from "@/components/Hero";
import { getProductsByCollection } from "@/utils/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women Collection",
};

export default async function WomenPage() {
  const womenCollection = await getProductsByCollection("women-collection");
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
