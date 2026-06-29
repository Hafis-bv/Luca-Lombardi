import { Collections } from "@/components/Collections";
import { Hero } from "@/components/Hero";
import { sunglassesCollection } from "@/data/collections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunglasses Collection",
};

export default function SunglassesPage() {
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
