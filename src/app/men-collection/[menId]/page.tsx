import ProductDetails from "@/components/ProductDetails";
import { menCollection } from "@/data/collections";
import { notFound } from "next/navigation";

interface MenDetailsPageProps {
  params: Promise<{ menId: string }>;
}

export default async function MenDetailsPage({ params }: MenDetailsPageProps) {
  const { menId } = await params;
  const product = menCollection.find((col) => col.id == Number(menId));

  if (!product) return notFound();

  return (
    <>
      <ProductDetails collection={product} />
    </>
  );
}
