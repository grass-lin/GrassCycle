import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isCollapse: false,
  },
  reducers: {
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse;
    },
  },
});

export const { collapseMenu } = menuSlice.actions;
export default menuSlice.reducer;
