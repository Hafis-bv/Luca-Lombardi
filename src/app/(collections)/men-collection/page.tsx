import { Collections } from "@/components/Collections";
import { Hero } from "@/components/Hero";
import { getProductsByCollection } from "@/utils/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men Collection",
};

export default async function MenPage() {
  const menCollection = await getProductsByCollection("men-collection");
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
