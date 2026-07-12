// src/lib/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import drawerReducer from "./drawerSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    drawer: drawerReducer,
  },
});

export default store;
