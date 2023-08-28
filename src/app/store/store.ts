import { configureStore } from "@reduxjs/toolkit";
// ...
import { setupListeners } from "@reduxjs/toolkit/query";
import addUserSlice from "../features/addUser/addUserSlice";
import { addBazarApi } from "../features/bazar/bazarApi";
import mealSlice from "../features/meal/mealSlice";
export const store = configureStore({
  reducer: {
    user: addUserSlice,
    meal: mealSlice,
    [addBazarApi.reducerPath]: addBazarApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(addBazarApi.middleware),
});
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("reduxState", JSON.stringify(state));
});
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
