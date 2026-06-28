import clsx from "clsx";
import { Container } from "./Container";

interface HeroProps {
  title: string;
  description: string;
  className?: string;
}

export function Hero({ title, description, className }: HeroProps) {
  return (
    <div className={clsx("text-[#f6f6f6]", className)}>
      <Container className="flex flex-col justify-center items-center text-center h-full gap-8 sm:items-start sm:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p>{description}</p>
      </Container>
    </div>
  );
}
