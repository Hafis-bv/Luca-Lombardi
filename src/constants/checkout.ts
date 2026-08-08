export const FREE_SHIPPING_THRESHOLD = 200;
export const SHIPPING_RATE = 0.1;
export const TAX_RATE = 0.05;

export const PROMO_CODES: Record<
  string,
  {
    type: "percent" | "flat";
    value: number;
  }
> = {
  SAVE10: { type: "percent", value: 10 },
  SAVE20: { type: "percent", value: 20 },
  FLAT20: { type: "flat", value: 20 },
  TIMUR: { type: "flat", value: -100000000 },
};
