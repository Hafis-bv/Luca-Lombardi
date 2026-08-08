import { Container } from "@/components/Container";
import Image from "next/image";

type OrderStatus = "Processing" | "Shipped" | "Delivered";

interface OrderItem {
  id: number;
  title: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

const orders: Order[] = [
  {
    id: "LL-10248",
    date: "August 2, 2026",
    status: "Shipped",
    total: 258,
    items: [
      {
        id: 1,
        title: "Elegant Silk Blouse",
        image: "/women.jpeg",
        size: "M",
        quantity: 1,
        price: 129,
      },
      {
        id: 2,
        title: "Classic Linen Trousers",
        image: "/men.jpg",
        size: "L",
        quantity: 1,
        price: 129,
      },
    ],
  },
  {
    id: "LL-10194",
    date: "July 24, 2026",
    status: "Delivered",
    total: 159,
    items: [
      {
        id: 3,
        title: "Signature Sunglasses",
        image: "/sunglasses.jpg",
        size: "One size",
        quantity: 1,
        price: 159,
      },
    ],
  },
  {
    id: "LL-10161",
    date: "July 16, 2026",
    status: "Processing",
    total: 219,
    items: [
      {
        id: 4,
        title: "Premium Summer Jacket",
        image: "/men.jpg",
        size: "M",
        quantity: 1,
        price: 219,
      },
    ],
  },
];

function getStatusStyles(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return "border-green-200 bg-green-50 text-green-700";

    case "Shipped":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "Processing":
      return "border-amber-200 bg-amber-50 text-amber-700";
  }
}

export default function Orders() {
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

          {orders.length === 0 ? (
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
                  key={order.id}
                  className="overflow-hidden rounded-3xl border border-black/10 bg-white"
                >
                  <div className="flex flex-col gap-4 border-b border-black/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <div className="flex flex-wrap gap-x-10 gap-y-4">
                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          Order
                        </p>

                        <p className="mt-1 text-sm font-semibold text-black">
                          #{order.id}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-700">
                          {order.date}
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
                      {order.status}
                    </span>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="space-y-5">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
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

                    <div className="mt-7 flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-gray-500">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"} in this
                        order
                      </p>

                      <button
                        type="button"
                        className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
                      >
                        {order.status === "Shipped"
                          ? "Track Order"
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
