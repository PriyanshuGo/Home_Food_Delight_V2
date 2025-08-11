import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryId } from "@/types/product";

interface CategoryState {
  activeCategory: CategoryId;
}

const initialState: CategoryState = {
  activeCategory: "all",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<CategoryId>) {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;
