import { SHIPPING_RATE, TAX_RATE } from "@/app/cart/widgets/Cart";
import { CartItem } from "@/store/slices/cartSlice";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

interface ReqBody {
  userId: string;
  items: CartItem[];
}

export async function POST(req: NextRequest) {
  const { userId, items }: ReqBody = await req.json();
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
    const tax = Number((subtotal * TAX_RATE).toFixed(2));

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      ...items.map((item) => ({
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
      })),
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: SHIPPING_RATE * 100,
          product_data: {
            name: "Shipping",
          },
        },
      },
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(tax * 100),
          product_data: {
            name: "Tax",
          },
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      metadata: {
        userId,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
