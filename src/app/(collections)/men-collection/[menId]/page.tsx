import ProductDetails from "@/components/ProductDetails";
import { getProductById } from "@/utils/products";
import { notFound } from "next/navigation";

interface MenDetailsPageProps {
  params: Promise<{ menId: string }>;
}

export async function generateMetadata({ params }: MenDetailsPageProps) {
  const { menId } = await params;
  const product = await getProductById(menId);

  if (!product)
    return {
      title: "Page not found",
    };
  return {
    title: `${product.title}`,
  };
}

export default async function MenDetailsPage({ params }: MenDetailsPageProps) {
  const { menId } = await params;
  const product = await getProductById(menId);

  if (!product) return notFound();

  return (
    <>
      <ProductDetails collection={product} />
    </>
  );
}
