"use client";

import { Container } from "@/components/Container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useAuth } from "@/hooks/useAuth";
import { firebaseAuth } from "@/lib/firebase";
import { setUser } from "@/store/slices/authSlice";
import { updateProfile } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiCheck,
  FiEdit2,
  FiLogOut,
  FiPackage,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";

export function Profile() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { handleLogout } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    setNameValue(user?.displayName || "");
  }, [user?.displayName]);

  if (!user) return null;

  const itemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = Number(
    cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
  ).toFixed(2);

  async function handleSaveName() {
    const trimmed = nameValue.trim();

    if (trimmed.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    const currentUser = firebaseAuth.currentUser;
    if (!currentUser || !user) return;

    setIsSaving(true);
    setError(null);

    try {
      await updateProfile(currentUser, { displayName: trimmed });
      dispatch(setUser({ ...user, displayName: trimmed }));
      setIsEditing(false);
      setSuccess("Name updated");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.log(err);
      setError("Couldn't update your name. Try again");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancelEdit() {
    setNameValue(user?.displayName || "");
    setIsEditing(false);
    setError(null);
  }

  return (
    <div className="pt-20 pb-24">
      <Container>
        <div className="mb-8 flex flex-col items-start sm:items-end sm:justify-between sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
            <p className="mt-1 text-gray-500">
              Manage your account and see what&apos;s in your bag
            </p>
          </div>
          <Link
            href={"/"}
            className="rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-black/5 transition"
          >
            Continue shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="h-fit rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-54">
            <div className="flex flex-col items-center text-center">
              {user.photoURL ? (
                <Image
                  width={96}
                  height={96}
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="size-24 rounded-full border border-black/10 object-cover"
                />
              ) : (
                <div className="grid size-24 place-items-center rounded-full border border-black/10 bg-black/5">
                  <FiUser className="size-9 text-gray-500" />
                </div>
              )}

              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {user.displayName || "User"}
              </h2>
              <p className="mt-1 truncate text-sm text-gray-500">
                {user.email}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-black/10 bg-white p-4 text-center">
                <p className="text-lg font-semibold text-gray-900">
                  {isHydrated ? itemsCount : 0}
                </p>
                <p className="mt-1 text-xs text-gray-500">In cart</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-4 text-center">
                <p className="text-lg font-semibold text-gray-900">
                  ${isHydrated ? cartTotal : "0.00"}
                </p>
                <p className="mt-1 text-xs text-gray-500">Cart value</p>
              </div>
            </div>

            <Link
              href={"/cart"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              <FiShoppingBag size={16} /> Go to cart
            </Link>

            <button
              onClick={handleLogout}
              type="button"
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              <FiLogOut size={16} /> Log out
            </button>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Account details
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-black/5 transition"
                  >
                    <FiEdit2 size={14} /> Edit
                  </button>
                )}
              </div>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-gray-500">Name</span>
                  {isEditing ? (
                    <div className="flex w-full gap-2 sm:w-auto">
                      <input
                        value={nameValue}
                        onChange={(e) => {
                          setNameValue(e.target.value);
                          setError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key == "Enter") handleSaveName();
                          if (e.key == "Escape") handleCancelEdit();
                        }}
                        placeholder="Your name"
                        className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-black/30 transition sm:w-64"
                        type="text"
                      />
                      <button
                        onClick={handleSaveName}
                        disabled={isSaving}
                        type="button"
                        className="grid size-10 cursor-pointer place-items-center rounded-xl bg-black text-white hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        type="button"
                        className="grid size-10 cursor-pointer place-items-center rounded-xl border border-black/10 bg-white text-gray-700 hover:bg-black/5 transition"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="font-medium text-gray-900">
                      {user.displayName || "Not set"}
                    </span>
                  )}
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}
                {success && <p className="text-xs text-green-600">{success}</p>}

                <div className="h-px w-full bg-black/5"></div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Email</span>
                  <span className="truncate font-medium text-gray-900">
                    {user.email}
                  </span>
                </div>

                <div className="h-px w-full bg-black/5"></div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Customer ID</span>
                  <span className="truncate font-mono text-xs text-gray-700">
                    {user.uid}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  In your cart
                </h2>
                {isHydrated && cartItems.length > 0 && (
                  <Link
                    href={"/cart"}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 transition"
                  >
                    View all
                  </Link>
                )}
              </div>

              {!isHydrated ? null : cartItems.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {cartItems.slice(0, 3).map((item) => (
                    <Link
                      key={`${item.id}-${item.sizeId}`}
                      href={`${item.collection}/${item.id}`}
                      className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-3 hover:bg-black/5 transition"
                    >
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.collection} • Size: {item.size} •{" "}
                          {item.quantity} pcs
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        ${item.price * item.quantity}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-black/10 p-8 text-center">
                  <p className="text-sm text-gray-500">
                    Your cart is empty. Let&apos;s add something nice.
                  </p>
                  <Link
                    href={"/new-collection"}
                    className="mt-5 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
                  >
                    Browse new collection
                  </Link>
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Orders</h2>
              <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-black/10 p-8 text-center">
                <FiPackage className="size-7 text-gray-400" />
                <p className="mt-3 text-sm text-gray-500">
                  No orders yet. Once checkout is live, your order history shows
                  up here.
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
