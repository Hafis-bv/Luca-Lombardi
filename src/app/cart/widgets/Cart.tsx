"use client";

import { Container } from "@/components/Container";
import { useAppSelector } from "@/hooks/redux";

import Link from "next/link";
import { useState } from "react";
import { CartRow } from "./CartRow";

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_RATE = 0.1;

const PROMO_CODES: Record<
  string,
  {
    type: "percent" | "flat";
    value: number;
  }
> = {
  SAVE10: { type: "percent", value: 10 },
  SAVE20: { type: "percent", value: 20 },
  FLAT20: { type: "flat", value: 20 },
};

export function Cart() {
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const [promoValue, setPromoValue] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    type: "percent" | "flat";
    value: number;
  } | null>(null);

  const subtotal = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const tax = Number((subtotal * 0.05).toFixed(2));
  const shipping =
    subtotal > FREE_SHIPPING_THRESHOLD ? 0 : subtotal * SHIPPING_RATE;

  const discount = appliedPromo
    ? appliedPromo.type == "percent"
      ? subtotal * (appliedPromo.value / 100)
      : appliedPromo.value
    : 0;

  const total = Number((subtotal + tax + shipping - discount).toFixed(2));

  function handleApplyPromo() {
    const code = promoValue.trim().toUpperCase();
    if (!code) return setPromoError("Enter a promocode");

    const match = PROMO_CODES[code];
    if (!match) return setPromoError("Invalid promocode");

    setAppliedPromo({ code, ...match });
    setPromoError(null);
  }
  function handleRemovePromo() {
    setAppliedPromo(null);
    setPromoError(null);
    setPromoValue("");
  }

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
                  <CartRow key={`${item.id}-${item.sizeId}`} item={item} />
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
                  {appliedPromo && (
                    <div className="flex items-center justify-between text-green-600">
                      <span>Promo ({appliedPromo.code})</span>
                      <span className="font-medium">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="h-px w-full bg-black/5"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${total}
                    </span>
                  </div>
                  <div className="h-px w-full bg-black/5"></div>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-3 py-2">
                      <span className="text-sm font-medium text-green-700">
                        {appliedPromo.code} applied
                      </span>
                      <button
                        onClick={handleRemovePromo}
                        className="text-xs font-medium text-gray-500 hover:text-gray-800 transition cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <input
                          onKeyDown={(e) => {
                            if (e.key == "Enter") handleApplyPromo();
                          }}
                          value={promoValue}
                          onChange={(e) => {
                            setPromoValue(e.target.value);
                            setPromoError(null);
                          }}
                          placeholder="Have a promocode?"
                          className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-black/30 transition uppercase"
                          type="text"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-black/5 transition cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="mt-2 text-xs text-red-500">
                          {promoError}
                        </p>
                      )}
                    </>
                  )}
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
