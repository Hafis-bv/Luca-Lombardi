import ProductDetails from "@/components/ProductDetails";
import { sunglassesCollection } from "@/data/collections";
import { notFound } from "next/navigation";

interface SunglassesDetailsPageProps {
  params: Promise<{ sunglassesId: string }>;
}

export async function generateMetadata({ params }: SunglassesDetailsPageProps) {
  const { sunglassesId } = await params;
  const product = sunglassesCollection.find(
    (col) => col.id == Number(sunglassesId),
  );

  if (!product)
    return {
      title: "Page not found",
    };
  return {
    title: `${product.title}`,
  };
}

export default async function SunglassesDetailsPage({
  params,
}: SunglassesDetailsPageProps) {
  const { sunglassesId } = await params;
  const product = sunglassesCollection.find(
    (col) => col.id == Number(sunglassesId),
  );

  if (!product) return notFound();

  return (
    <>
      <ProductDetails collection={product} />
    </>
  );
}
