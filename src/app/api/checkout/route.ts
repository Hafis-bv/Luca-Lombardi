import { CartItem } from "@/store/slices/cartSlice";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

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
};

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_RATE = 0.1;
const TAX_RATE = 0.05;

interface ReqBody {
  userId: string;
  items: CartItem[];
  promocode?: string;
}

export async function POST(req: NextRequest) {
  const { userId, items, promocode }: ReqBody = await req.json();
  try {
    if (!userId)
      return NextResponse.json(
        { error: "User must be to logged in to checkout" },
        { status: 400 },
      );

    if (!items || items.length == 0)
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

    const subtotal = items.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    const shipping =
      subtotal > FREE_SHIPPING_THRESHOLD ? 0 : subtotal * SHIPPING_RATE;

    const tax = Number((subtotal * TAX_RATE).toFixed(2));

    let discount = 0;
    let stripeCoupon: string | undefined;

    if (promocode) {
      const promo = PROMO_CODES[promocode.trim().toUpperCase()];

      if (!promo)
        return NextResponse.json(
          { error: "Invalid promo code" },
          { status: 400 },
        );

      discount =
        promo.type === "percent" ? subtotal * (promo.value / 100) : promo.value;

      const coupon = await stripe.coupons.create(
        promo.type === "percent"
          ? { percent_off: promo.value, duration: "once" }
          : {
              amount_off: Math.round(promo.value * 100),
              currency: "usd",
              duration: "once",
            },
      );
      stripeCoupon = coupon.id;
    }

    const total = Number((subtotal + tax + shipping - discount).toFixed(2));

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.title,
            images: [item.image],
            metadata: {
              productId: item.id.toString(),
              collection: item.collection,
              size: item.size,
            },
          },
        },
      }));

    if (shipping > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(shipping * 100),
          product_data: {
            name: "Shipping",
          },
        },
      });
    }

    line_items.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(tax * 100),
        product_data: {
          name: "Tax",
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      discounts: stripeCoupon ? [{ coupon: stripeCoupon }] : undefined,
      metadata: {
        userId,
        promocode: promocode ?? "",
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    });

    return NextResponse.json({
      url: session.url,
      total,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
