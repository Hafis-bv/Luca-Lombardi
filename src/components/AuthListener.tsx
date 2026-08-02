"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { firebaseAuth } from "@/lib/firebase";
import { logout, setLoading, setUser } from "@/store/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { CustomLoading } from "./CustomLoading";
import { addToCart, setCart } from "@/store/slices/cartSlice";

export function AuthListener() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const { loading, user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName!,
            photoURL: firebaseUser.photoURL!,
          }),
        );
        const cart = JSON.parse(
          localStorage.getItem(`cart_${firebaseUser.uid}`) ?? "[]",
        );
        dispatch(setCart(cart));
        const pending = JSON.parse(sessionStorage.getItem("pendingCartItem"));
        if (pending) {
          dispatch(addToCart(pending));
          sessionStorage.removeItem("pendingCartItem");
        }
      } else {
        dispatch(logout());
      }
      dispatch(setLoading(false));
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`cart_${user?.uid}`, JSON.stringify(cart));
  }, [cart, user]);

  if (loading) {
    return <CustomLoading />;
  }

  return null;
}
