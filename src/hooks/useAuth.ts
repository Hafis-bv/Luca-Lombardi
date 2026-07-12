"use client";

import { firebaseAuth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "./redux";
import { logout, setUser } from "@/store/slices/authSlice";

const providers = { google: new GoogleAuthProvider() };

type Provider = keyof typeof providers;

export const useAuth = () => {
  const [, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function saveToken() {
    const user = firebaseAuth.currentUser;

    if (!user) return;
    const firebaseToken = await user.getIdToken();
    setCookie("auth_token", firebaseToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  async function handleLogin(provider: Provider) {
    setIsLoading(true);
    try {
      const { user } = await signInWithPopup(firebaseAuth, providers[provider]);
      await saveToken();

      router.push("/");
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEmailRegister(email: string, password: string) {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      await saveToken();
      router.push("/");

      return user;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEmailLogin(email: string, password: string) {
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      await saveToken();
      router.push("/");
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    await signOut(firebaseAuth);
    dispatch(logout());

    removeCookie("auth_token", {
      path: "/",
    });

    router.push("/login");
  }
  return {
    isLoading,
    handleGoogleLogin: () => handleLogin("google"),
    handleEmailRegister,
    handleEmailLogin,
    handleLogout,
    setIsLoading,
  };
};
