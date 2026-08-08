import { Metadata } from "next";
import CheckoutSuccess from "./widgets/CheckoutSuccess";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccess />;
}
