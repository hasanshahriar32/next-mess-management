import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface userInterface {
  name: string;
  email: string;
}

// Define the initial state using that type
const initialState: userInterface[] = [
  { name: "pervez", email: "p@gmail.com" },
];

export const addUserSlice = createSlice({
  name: "addUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    adduser: (state, action) => {},
    removeUser: (state, action) => {},
  },
});

export const { adduser, removeUser } = addUserSlice.actions;

// Export the reducer
export default addUserSlice.reducer;
