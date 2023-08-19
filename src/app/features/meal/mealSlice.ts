import { createSlice } from "@reduxjs/toolkit";

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("mealState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("mealState", serializedState);
  } catch {
    // Handle errors here
  }
};

const initialState = loadState() || {
  personTotals: [],
  grandTotal: 0,
  totalBazarAmount: 0,
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    // ... Other actions ...
    setPersonTotals: (state, action) => {
      state.personTotals = action.payload;
      saveState(state); // Save state to local storage
    },
    setGrandTotal: (state, action) => {
      state.grandTotal = action.payload;
      saveState(state); // Save state to local storage
    },
    setTotalBazarAmount: (state, action) => {
      state.totalBazarAmount = action.payload;
      saveState(state); // Save state to local storage
    },
  },
});

export const { setGrandTotal, setPersonTotals, setTotalBazarAmount } =
  mealSlice.actions;
export default mealSlice.reducer;
