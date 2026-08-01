import { Collections } from "@/components/Collections";
import { Hero } from "@/components/Hero";
import { getProductsByCollection } from "@/utils/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunglasses Collection",
};

export default async function SunglassesPage() {
  const sunglassesCollection = await getProductsByCollection(
    "sunglasses-collection",
  );
  return (
    <>
      <Hero
        title="Sunglasses Collection"
        description="Timeless silhouettes. Modern attitude. Sunglasses that elevate your look."
        className="bg-sunglasses"
      />
      <Collections collection={sunglassesCollection} />
    </>
  );
}
