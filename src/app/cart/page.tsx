import { Metadata } from "next";
import { Cart } from "./widgets/Cart";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <>
      <Cart />
    </>
  );
}
