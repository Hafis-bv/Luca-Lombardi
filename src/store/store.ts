import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./slices/searchSlice";
import { authSlice } from "./slices/authSlice";
import { cartSlice } from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

store.subscribe(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
