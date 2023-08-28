import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAmountByMonth: {},
  totalMealByUser: {},
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    updateTotalAmountByMonth: (state, action) => {
      state.totalAmountByMonth = action.payload;
    },
    updateTotalMealByUser: (state, action) => {
      state.totalMealByUser = action.payload;
    },
  },
});

export const { updateTotalAmountByMonth, updateTotalMealByUser } =
  mealSlice.actions;

export default mealSlice.reducer;
