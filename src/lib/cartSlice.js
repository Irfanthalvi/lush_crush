// src/lib/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // { [id]: { item, count } }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { item } = action.payload;
      if (!state.items[item.id]) {
        state.items[item.id] = { item, count: 1 };
      }
    },
    increment: (state, action) => {
      const { id } = action.payload;
      if (state.items[id]) {
        state.items[id].count += 1;
      }
    },
    decrement: (state, action) => {
      const { id } = action.payload;
      if (state.items[id]) {
        if (state.items[id].count <= 1) {
          delete state.items[id];
        } else {
          state.items[id].count -= 1;
        }
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      delete state.items[id];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, increment, decrement, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
