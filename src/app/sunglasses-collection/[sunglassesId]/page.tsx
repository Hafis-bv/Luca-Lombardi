import ProductDetails from "@/components/ProductDetails";
import { sunglassesCollection } from "@/data/collections";
import { notFound } from "next/navigation";

interface SunglassesDetailsPageProps {
  params: Promise<{ sunglassesId: string }>;
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
