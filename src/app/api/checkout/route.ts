import { PROMO_CODES } from "@/constants/checkout";
import { adminDb } from "@/lib/firebase-admin";
import { CartItem } from "@/store/slices/cartSlice";
import { calculateCartTotals } from "@/utils/pricing";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

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

    const normalizedPromocode = promocode?.trim().toUpperCase();

    if (normalizedPromocode && !PROMO_CODES[normalizedPromocode]) {
      return NextResponse.json({ error: "Invalid promocode" }, { status: 400 });
    }

    const { subtotal, tax, shipping, discount, total } = calculateCartTotals(
      items,
      normalizedPromocode,
    );

    let stripeCoupon: string | undefined;

    if (normalizedPromocode) {
      const promo = PROMO_CODES[normalizedPromocode];
      const coupon = await stripe.coupons.create(
        promo.type === "percent"
          ? {
              percent_off: promo.value,
              duration: "once",
            }
          : {
              amount_off: Math.round(promo.value * 100),
              currency: "usd",
              duration: "once",
            },
      );
      stripeCoupon = coupon.id;
    }

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
        promocode: normalizedPromocode ?? "",
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        shipping: shipping.toString(),
        discount: discount.toString(),
        total: total.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    });

    await adminDb
      .collection("orders")
      .doc(session.id)
      .set({
        userId,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          collection: item.collection,
        })),
        promocode: normalizedPromocode ?? null,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        status: "pending",
        stripeSessionId: session.id,
        stripePaymentIntentId: null,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
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
