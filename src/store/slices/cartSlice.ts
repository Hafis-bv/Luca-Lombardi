import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
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

const initialState: InitialState = {
  items: [
    {
      id: 1,
      image: "/products/luca-blazer-black.jpg",
      title: "Wool Blend Blazer",
      price: 429,
      isNew: true,
      collection: "Autumn/Winter 2026",
      size: "M",
      sizeId: 2,
      quantity: 1,
      stock: 5,
    },
    {
      id: 2,
      image: "/products/luca-trench-camel.jpg",
      title: "Camel Trench Coat",
      price: 689,
      isNew: false,
      collection: "Autumn/Winter 2026",
      size: "L",
      sizeId: 3,
      quantity: 1,
      stock: 2,
    },
  ],
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
  },
});

export const { addToCart } = cartSlice.actions;
