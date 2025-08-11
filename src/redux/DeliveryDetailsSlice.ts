import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeliveryDetailsState {
  name: string;
  address: string[];
  selectedAddress: string;
}

const initialState: DeliveryDetailsState = {
  name: "",
  address: [],
  selectedAddress: "",
};

const deliveryDetailSlice = createSlice({
  name: "deliveryDetails",
  initialState,
  reducers: {
    setDeliveryDetails(state, action: PayloadAction<DeliveryDetailsState>) {
      return { ...state, ...action.payload };
    },
    clearDeliveryDetails(state) {
      state.name = "";
      state.address = [];
      state.selectedAddress = "";
    },
    loadDetailsFromStorage(state, action: PayloadAction<DeliveryDetailsState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setDeliveryDetails,
  clearDeliveryDetails,
  loadDetailsFromStorage,
} = deliveryDetailSlice.actions;

export default deliveryDetailSlice.reducer;
