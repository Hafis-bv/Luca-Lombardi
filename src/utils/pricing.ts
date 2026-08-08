import {
  FREE_SHIPPING_THRESHOLD,
  PROMO_CODES,
  SHIPPING_RATE,
  TAX_RATE,
} from "@/constants/checkout";
import { CartItem } from "@/store/slices/cartSlice";

export function calculateCartTotals(
  items: CartItem[],
  promocode?: string | null,
) {
  const subtotal = items.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const shipping =
    subtotal > FREE_SHIPPING_THRESHOLD ? 0 : subtotal * SHIPPING_RATE;

  const promo = promocode ? PROMO_CODES[promocode.trim().toUpperCase()] : null;

  const discount = promo
    ? promo.type == "percent"
      ? (subtotal + shipping + tax) * (promo.value / 100)
      : promo.value
    : 0;

  const total = Number((subtotal + tax + shipping - discount).toFixed(2));

  return {
    subtotal,
    tax,
    shipping,
    discount,
    total,
  };
}
