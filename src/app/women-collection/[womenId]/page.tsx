import ProductDetails from "@/components/ProductDetails";
import { womenCollection } from "@/data/collections";
import { notFound } from "next/navigation";

interface WomenDetailsPageProps {
  params: Promise<{ womenId: string }>;
}

export default async function WomenDetailsPage({
  params,
}: WomenDetailsPageProps) {
  const { womenId } = await params;
  const product = womenCollection.find((col) => col.id == Number(womenId));

  if (!product) return notFound();

  return (
    <>
      <ProductDetails collection={product} />
    </>
  );
}
