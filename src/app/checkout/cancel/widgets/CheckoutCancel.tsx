import { Container } from "@/components/Container";
import Link from "next/link";
import { FiXCircle } from "react-icons/fi";

export default function CheckoutCancel() {
  return (
    <div className="pt-20 pb-24">
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-200 bg-red-50">
            <FiXCircle className="text-red-500" size={40} />
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-gray-900">
            Checkout cancelled
          </h1>
          <p className="mt-3 text-gray-500">
            Your payment was cancelled and you haven&apos;t been charged.
            Your cart is still saved, so you can pick up right where you left
            off.
          </p>
          <Link
            href="/cart"
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Back to cart
          </Link>
        </div>
      </Container>
    </div>
  );
}
