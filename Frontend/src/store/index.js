import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./reducers/Menu";

export default configureStore({
  reducer: {
    menu: MenuReducer,
  },
});
