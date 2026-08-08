"use client";

import { Container } from "@/components/Container";
import { useAppSelector } from "@/hooks/redux";
import { db } from "@/lib/firebase";
import { Order, OrderStatus } from "@/types/order";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getStatusStyles(status: OrderStatus) {
  switch (status) {
    case "delivered":
      return "border-green-200 bg-green-50 text-green-700";

    case "shipped":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "processing":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "cancelled":
      return "border-red-200 bg-red-50 text-red-700";

    case "pending":
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
}

function getStatusLabel(status: OrderStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function Orders() {
  const { user, loading: authLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;

    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
    );

    getDocs(ordersQuery)
      .then((snapshot) => {
        const fetchedOrders = snapshot.docs.map((doc) => doc.data() as Order);
        fetchedOrders.sort(
          (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis(),
        );
        setOrders(fetchedOrders);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#f8f8f8] py-16">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-xs font-medium tracking-[0.25em] text-gray-500 uppercase">
              Your account
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-black sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              View your purchases and track their current status.
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-black/10 bg-white px-6 py-20 text-center">
              <p className="text-sm text-gray-500">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-3xl border border-black/10 bg-white px-6 py-20 text-center">
              <h2 className="text-xl font-semibold text-black">
                No orders yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Your completed purchases will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <article
                  key={order.stripeSessionId}
                  className="overflow-hidden rounded-3xl border border-black/10 bg-white"
                >
                  <div className="flex flex-col gap-4 border-b border-black/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <div className="flex flex-wrap gap-x-10 gap-y-4">
                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          Order
                        </p>

                        <p className="mt-1 text-sm font-semibold text-black">
                          #{order.stripeSessionId.slice(-8).toUpperCase()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-700">
                          {order.createdAt
                            ?.toDate()
                            .toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          Total
                        </p>

                        <p className="mt-1 text-sm font-semibold text-black">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-4 py-2 text-xs font-medium ${getStatusStyles(
                        order.status,
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="space-y-5">
                      {order.items.map((item, index) => (
                        <div
                          key={`${item.id}-${item.size}-${index}`}
                          className="flex gap-4 border-b border-black/10 pb-5 last:border-b-0 last:pb-0"
                        >
                          <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-32 sm:w-28">
                            <Image
                              fill
                              src={item.image}
                              alt={item.title}
                              sizes="112px"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                            <div>
                              <h2 className="truncate text-base font-medium text-black sm:text-lg">
                                {item.title}
                              </h2>

                              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
                                <span>Size: {item.size}</span>
                                <span>Quantity: {item.quantity}</span>
                              </div>
                            </div>

                            <p className="mt-4 font-semibold text-black">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {expandedOrderId === order.stripeSessionId && (
                      <div className="mt-7 space-y-2 rounded-2xl border border-black/10 bg-[#f8f8f8] p-5 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Subtotal</span>
                          <span className="font-medium text-black">
                            ${order.subtotal.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Shipping</span>
                          <span className="font-medium text-black">
                            ${order.shipping.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Tax</span>
                          <span className="font-medium text-black">
                            ${order.tax.toFixed(2)}
                          </span>
                        </div>

                        {order.discount > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">
                              Discount
                              {order.promocode ? ` (${order.promocode})` : ""}
                            </span>
                            <span className="font-medium text-green-700">
                              -${order.discount.toFixed(2)}
                            </span>
                          </div>
                        )}

                        <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-2">
                          <span className="font-semibold text-black">
                            Total
                          </span>
                          <span className="font-semibold text-black">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-7 flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-gray-500">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"} in this
                        order
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          order.status === "shipped"
                            ? undefined
                            : setExpandedOrderId((current) =>
                                current === order.stripeSessionId
                                  ? null
                                  : order.stripeSessionId,
                              )
                        }
                        className="rounded-full cursor-pointer bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
                      >
                        {order.status === "shipped"
                          ? "Track Order"
                          : expandedOrderId === order.stripeSessionId
                            ? "Hide Details"
                            : "View Details"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
