"use client";

import { CartItem, removeFromCart } from "@/store/slices/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { addToCart, decreaseQuantity } from "@/store/slices/cartSlice";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/redux";
import Link from "next/link";

interface CartRowProps {
  item: CartItem;
}

export function CartRow({ item }: CartRowProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm sm:p-5 flex gap-4 sm:gap-5">
      <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-32 sm:w-28">
        <Image src={item.image} alt={item.title} fill sizes="120px" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            className="cursor-pointer"
            href={`${item.collection}/${item.id}`}
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{item.collection}</p>
            <span className="mt-2 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2.5 py-0.5 text-xs font-medium text-gray-700">
              Size: {item.size}
            </span>
          </Link>
          <div className="text-right">
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-semibold text-gray-900">{item.price}$</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-2 py-2">
            <button
              onClick={() =>
                dispatch(
                  decreaseQuantity({
                    id: item.id,
                    sizeId: item.sizeId,
                  }),
                )
              }
              className="grid cursor-pointer h-9 w-9 place-items-center rounded-xl hover:bg-black/5 active:scale-[0.98] transition"
            >
              <AiOutlineMinus />
            </button>
            <span className="min-w-[36px] text-center text-sm font-semibold text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => dispatch(addToCart(item))}
              className="grid cursor-pointer h-9 w-9 place-items-center rounded-xl hover:bg-black/5 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <AiOutlinePlus />
            </button>
          </div>
          <button
            onClick={() =>
              dispatch(
                removeFromCart({
                  id: item.id,
                  sizeId: item.sizeId,
                }),
              )
            }
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-black/5 transition"
          >
            <BsTrash3 /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
