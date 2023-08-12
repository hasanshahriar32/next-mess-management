import { configureStore } from "@reduxjs/toolkit";
// ...
import { setupListeners } from "@reduxjs/toolkit/query";
import addUserSlice from "../features/addUser/addUserSlice";
import { postApi } from "../features/post/postApi";
export const store = configureStore({
  reducer: {
    user: addUserSlice,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
