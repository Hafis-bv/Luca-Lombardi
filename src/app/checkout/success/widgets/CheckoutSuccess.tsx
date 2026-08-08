"use client";

import { Container } from "@/components/Container";
import { useAppDispatch } from "@/hooks/redux";
import { clearCart } from "@/store/slices/cartSlice";
import Link from "next/link";
import { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function CheckoutSuccess() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="pt-20 pb-24">
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-200 bg-green-50">
            <FiCheckCircle className="text-green-600" size={40} />
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-gray-900">
            Payment successful
          </h1>
          <p className="mt-3 text-gray-500">
            Thank you for your order. We&apos;ve received your payment and
            you&apos;ll receive a confirmation email shortly.
          </p>
          <Link
            href="/orders"
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
          >
            View your orders
          </Link>
        </div>
      </Container>
    </div>
  );
}
