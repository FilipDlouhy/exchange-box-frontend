import { configureStore } from "@reduxjs/toolkit";
import friendsMenuReducer from "./friend-state/menuSlice";

export const store = configureStore({
  reducer: {
    friendsMenu: friendsMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
