import ProductDetails from "@/components/ProductDetails";
import { getProductById } from "@/utils/products";
import { notFound } from "next/navigation";

interface WomenDetailsPageProps {
  params: Promise<{ womenId: string }>;
}

export async function generateMetadata({ params }: WomenDetailsPageProps) {
  const { womenId } = await params;
  const product = await getProductById(womenId);

  if (!product)
    return {
      title: "Page not found",
    };
  return {
    title: `${product.title}`,
  };
}

export default async function WomenDetailsPage({
  params,
}: WomenDetailsPageProps) {
  const { womenId } = await params;
  const product = await getProductById(womenId);

  if (!product) return notFound();

  return (
    <>
      <ProductDetails collection={product} />
    </>
  );
}
