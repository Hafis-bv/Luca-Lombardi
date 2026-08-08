import { Metadata } from "next";
import Orders from "./widgets/Orders";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return <Orders />;
}
