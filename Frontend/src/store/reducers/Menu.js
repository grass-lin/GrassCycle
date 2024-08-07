import { createSlice } from "@reduxjs/toolkit";

const path = window.location.pathname;

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isCollapse: false,
    selected: path,
  },
  reducers: {
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    switchSelected: (state, { payload: target }) => {
      state.selected = target;
    },
  },
});

export const { collapseMenu, switchSelected } = menuSlice.actions;
export default menuSlice.reducer;
