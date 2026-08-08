"use client";

import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { calculateCartTotals } from "@/utils/pricing";
import { PROMO_CODES } from "@/constants/checkout";

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

  const { subtotal, tax, shipping, discount, total } = calculateCartTotals(
    cartItems,
    appliedPromo?.code,
  );

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
