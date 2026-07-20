"use client";

import { Container } from "@/components/Container";
import { useAppSelector } from "@/hooks/redux";
import Image from "next/image";
import Link from "next/link";

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_RATE = 0.1;

export function Cart() {
  const { items: cartItems } = useAppSelector((state) => state.cart);

  const subtotal = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const tax = Number((subtotal * 0.05).toFixed(2));
  const shipping =
    subtotal > FREE_SHIPPING_THRESHOLD ? 0 : subtotal * SHIPPING_RATE;

  const total = Number((subtotal + tax + shipping).toFixed(2));

  return (
    <div className="pt-20 pb-24">
      <Container>
        {cartItems.length > 0 ? (
          <div>
            <div className="mb-8 flex flex-col items-start sm:items-end sm:justify-between sm:flex-row gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Cart</h1>
                <p className="mt-1 text-gray-500">
                  {cartItems.length} {cartItems.length > 1 ? "items" : "item"}{" "}
                  in your cart
                </p>
              </div>
              <Link
                href={"/"}
                className="rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-black/5 transition"
              >
                Continue shopping
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm sm:p-5 flex gap-4 sm:gap-5"
                  >
                    <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-32 sm:w-28">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="120px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.collection}
                          </p>
                          <span className="mt-2 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                            Size: {item.size}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {item.price}$
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3"></div>
                    </div>
                  </div>
                ))}
              </div>
              <aside className="h-fit rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order summary
                </h2>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${subtotal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">
                      ${shipping}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium text-gray-900">${tax}</span>
                  </div>
                  <div className="h-px w-full bg-black/5"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${total}
                    </span>
                  </div>
                </div>
                <button className="mt-6 w-full cursor-pointer rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition">
                  Checkout
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">
                  Secure checkout • Fast delivery
                </p>
              </aside>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-semibold text-gray-900">Cart</h1>
            <p className="mt-3 text-gray-500">
              Your cart is empty. Let’s add something nice.
            </p>
            <Link
              href={"/"}
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Continue shopping
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
