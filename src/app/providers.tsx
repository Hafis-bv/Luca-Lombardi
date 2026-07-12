"use client";
import { AuthListener } from "@/components/AuthListener";
import { store } from "@/store/store";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <AuthListener />
        {children}
      </CookiesProvider>
    </Provider>
  );
}
