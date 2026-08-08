import { Metadata } from "next";
import CheckoutCancel from "./widgets/CheckoutCancel";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
};

export default function CheckoutCancelPage() {
  return <CheckoutCancel />;
}
