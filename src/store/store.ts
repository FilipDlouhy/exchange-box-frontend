import { configureStore } from "@reduxjs/toolkit";
import friendsMenuReducer from "./friend-state/friendMenuSlice";
import userReducer from "./user-state/userSlice";
import errorPopUpReducer from "./errorSlice";
import profileUserReducer from "./user-state/profileUserSlice";
import paginationSliceReducer from "./paginationSlice";
import searchSlice from "./searchSlice";
import activeModuleReduced from "./moduleSlice";

export const store = configureStore({
  reducer: {
    friendsMenu: friendsMenuReducer,
    user: userReducer,
    errorPopUp: errorPopUpReducer,
    profileUser: profileUserReducer,
    pagination: paginationSliceReducer,
    search: searchSlice,
    activeModule: activeModuleReduced,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["module.navigation.*.icon"],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
