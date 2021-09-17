import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/counter/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
