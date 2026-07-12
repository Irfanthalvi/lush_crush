// src/lib/drawerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  selectedItem: null
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.open = true;
      state.selectedItem = action.payload; // payload is the item object
    },
    closeDrawer: (state) => {
      state.open = false;
      state.selectedItem = null;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    }
  }
});

export const { openDrawer, closeDrawer, setSelectedItem } = drawerSlice.actions;
export default drawerSlice.reducer;
