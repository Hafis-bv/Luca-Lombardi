import { Collections } from "@/widgets/Collections";
import { Hero } from "@/widgets/Hero";
import { PopularProducts } from "@/widgets/PopularProducts";

export default function Home() {
  return (
    <div>
      <Hero />
      <Collections />
      <PopularProducts />
    </div>
  );
}
