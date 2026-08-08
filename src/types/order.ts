import { Timestamp } from "firebase/firestore";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  title: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
  collection: string;
}

export interface Order {
  userId: string;
  items: OrderItem[];
  promocode: string | null;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
