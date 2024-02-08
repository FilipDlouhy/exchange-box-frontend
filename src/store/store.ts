import { configureStore } from "@reduxjs/toolkit";
import friendsMenuReducer from "./friend-state/menuSlice";
import userReducer from "./user-state/userSlice";
import errorPopUpReducer from "./errorSlice";
import profileUserReducer from "./user-state/profileUserSlice";
import paginationSliceReducer from "./paginationSlice";

export const store = configureStore({
  reducer: {
    friendsMenu: friendsMenuReducer,
    user: userReducer,
    errorPopUp: errorPopUpReducer,
    profileUser: profileUserReducer,
    pagination: paginationSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
