import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  isNew: boolean;
  collection: string;
  size: string;
  sizeId: number;
  quantity: number;
  stock: number;
}

interface InitialState {
  items: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: InitialState = {
  items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.id == product.id && item.sizeId == product.sizeId,
      );

      if (existingItem) {
        if (existingItem.stock > existingItem.quantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.unshift(product);
      }
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ id: number; sizeId: number }>,
    ) => {
      const { id, sizeId } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id == id && item.sizeId == sizeId,
      );
      if (!existingItem) return;

      if (existingItem.quantity > 1) existingItem.quantity -= 1;
      else
        state.items = state.items.filter(
          (item) => !(item.id == id && item.sizeId == sizeId),
        );
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; sizeId: number }>,
    ) => {
      const { id, sizeId } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.sizeId === sizeId),
      );
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart } =
  cartSlice.actions;
