"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { firebaseAuth } from "@/lib/firebase";
import { logout, setLoading, setUser } from "@/store/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { CustomLoading } from "./CustomLoading";

export function AuthListener() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
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
      } else {
        dispatch(logout());
      }
      dispatch(setLoading(false));
    });
    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return <CustomLoading />;
  }

  return null;
}
