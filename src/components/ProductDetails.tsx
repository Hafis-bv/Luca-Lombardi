"use client";

import { Collection } from "@/types/collection";
import BreadCrumb from "./BreadCrumb";
import { SizeSelector } from "./SizeSelector";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/store/slices/cartSlice";
import Link from "next/link";

interface ProductDetailProps {
  collection: Collection;
}

export const productBenefits = [
  {
    id: 1,
    title: "Delivery",
    description: "1–3 days",
  },

  {
    id: 2,
    title: "Returns",
    description: "14 days",
  },

  {
    id: 3,
    title: "Support",
    description: "24/7",
  },
];

export default function ProductDetails({ collection }: ProductDetailProps) {
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const selectedSize = collection.sizes.find((s) => s.id == selectedSizeId);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    if (!selectedSize) return setSizeError("Please select a size");
    setSizeError(null);

    dispatch(
      addToCart({
        id: collection.id,
        image: collection.image,
        title: collection.title,
        price: collection.price,
        isNew: collection.isNew,
        collection: collection.collection,
        size: selectedSize.size,
        sizeId: selectedSize.id,
        quantity: 1,
        stock: selectedSize.stock,
      }),
    );

    setJustAdded(true);
  }

  function handleSizeSelect(sizeId: number) {
    setSizeError(null);
    setSelectedSizeId(sizeId);
    setJustAdded(false);
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 pt-10 pb-18">
        <BreadCrumb collection={collection} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12">
          <section className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              <img
                className="w-full h-[520px] sm:h-[620px] object-cover"
                src={collection.image}
                alt={collection.title}
              />
              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-semibold text-zinc-900 border border-zinc-100">
                  {collection.collection}
                </span>
              </div>
            </div>
          </section>
          <section className="w-full lg:sticky lg:top-8 h-fit">
            <div className="rounded-3xl border border-zinc-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
                {collection.title}
              </h1>
              <p className="mt-3 text-2xl font-semibold text-zinc-900">
                {collection.price}$
              </p>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                Clean minimal piece from the women-collection collection.
                Premium look, everyday comfort.
              </p>
              <SizeSelector
                sizes={collection.sizes}
                selectedSizeId={selectedSizeId}
                onSelect={handleSizeSelect}
              />
              {sizeError && (
                <p className="text-xs text-red-500 mt-2">{sizeError}</p>
              )}
              <div className="mt-7 flex flex-col gap-3">
                {justAdded ? (
                  <Link
                    className="h-12 flex justify-center items-center rounded-2xl bg-emerald-600 text-white font-semibold tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.18)] cursor-pointer"
                    href={"/cart"}
                  >
                    Go to cart
                  </Link>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="h-12 rounded-2xl bg-zinc-900 text-white font-semibold tracking-wide hover:bg-black transition shadow-[0_10px_25px_rgba(0,0,0,0.18)] cursor-pointer"
                  >
                    Add to cart
                  </button>
                )}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {productBenefits.map((ben) => (
                  <div
                    key={ben.id}
                    className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3"
                  >
                    <p className="text-xs font-semibold text-zinc-900">
                      {ben.title}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      {ben.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Tip: If you want a more oversized fit — choose one size up.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
