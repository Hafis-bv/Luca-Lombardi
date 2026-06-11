import { Container } from "@/components/Container";

export function Hero() {
  return (
    <div className="bg-hero text-[#f6f6f6]">
      <Container className="flex flex-col justify-center items-center text-center h-full gap-8 sm:items-start sm:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Timeless Luxury, Redefined
        </h1>
        <p>
          Discover curated pieces that embody heritage, craftsmanship, and quiet
          sophistication.
        </p>
      </Container>
    </div>
  );
}
