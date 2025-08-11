// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/redux/cartSlice";
import categoryReducer from "@/redux/categorySlice";
import deliveryDetailSlice from "@/redux/DeliveryDetailsSlice";

export const store = configureStore({
  reducer: { cart: cartSlice, category: categoryReducer, deliveryDetails: deliveryDetailSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
