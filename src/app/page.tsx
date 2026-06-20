import { Collections } from "@/widgets/Collections";
import { Hero } from "@/widgets/Hero";
import { PopularProducts } from "@/widgets/PopularProducts";
import { Privacy } from "@/widgets/Privacy";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <PopularProducts />
      <Privacy />
    </>
  );
}
