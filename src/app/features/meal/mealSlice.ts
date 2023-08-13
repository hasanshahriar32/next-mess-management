import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personTotals: [], // Array to store total meals for each person
  grandTotal: 0, // Grand total of all meals
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    // ... Other actions ...
    setPersonTotals: (state, action) => {
      state.personTotals = action.payload;
    },
    setGrandTotal: (state, action) => {
      state.grandTotal = action.payload;
    },
  },
});

export const { setGrandTotal, setPersonTotals } = mealSlice.actions;
export default mealSlice.reducer;
