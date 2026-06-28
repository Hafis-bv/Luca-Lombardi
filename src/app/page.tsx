import { Hero } from "@/components/Hero";
import { Collections } from "@/widgets/Collections";
import { PopularProducts } from "@/widgets/PopularProducts";
import { Privacy } from "@/widgets/Privacy";

export default function Home() {
  return (
    <>
      <Hero
        title="Timeless Luxury, Redefined"
        description="Discover curated pieces that embody heritage, craftsmanship, and quiet sophistication."
        className="bg-hero opacity-100"
      />
      <Collections />
      <PopularProducts />
      <Privacy />
    </>
  );
}
