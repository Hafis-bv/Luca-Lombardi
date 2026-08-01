import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_RATE = 0.1;
const TAX_RATE = 0.05;

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
  TIMUR: { type: "flat", value: 100000000 },
};

export const useCart = () => {
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
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

  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const shipping =
    subtotal > FREE_SHIPPING_THRESHOLD ? 0 : subtotal * SHIPPING_RATE;

  const discount = appliedPromo
    ? appliedPromo.type == "percent"
      ? (subtotal + shipping + tax) * (appliedPromo.value / 100)
      : appliedPromo.value
    : 0;

  const total = Number((subtotal + tax + shipping - discount).toFixed(2));

  function applyPromo() {
    const code = promoValue.trim().toUpperCase();
    if (!code) return setPromoError("Enter a promocode");

    const match = PROMO_CODES[code];
    if (!match) return setPromoError("Invalid promocode");

    setAppliedPromo({ code, ...match });
    setPromoError(null);
  }

  function removePromo() {
    setAppliedPromo(null);
    setPromoError(null);
    setPromoValue("");
  }

  async function checkout() {
    if (!user) return router.push("/login");
    setIsCheckingOut(true);
    try {
      const res = await axios.post("/api/checkout", {
        userId: user.uid,
        items: cartItems,
        promocode: appliedPromo?.code ?? null,
      });
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    } finally {
      setIsCheckingOut(false);
    }
  }

  return {
    cartItems,

    subtotal,
    shipping,
    tax,
    discount,
    total,

    promoValue,
    setPromoValue,
    promoError,
    setPromoError,

    appliedPromo,

    applyPromo,
    removePromo,

    checkout,
    isCheckingOut,
  };
};
