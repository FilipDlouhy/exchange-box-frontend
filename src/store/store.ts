import { configureStore } from "@reduxjs/toolkit";
import friendsMenuReducer from "./friend-state/friendMenuSlice";
import userReducer from "./user-state/userSlice";
import errorPopUpReducer from "./errorSlice";
import infoPopUpSlice from "./infoSlice";
import profileUserReducer from "./user-state/profileUserSlice";
import addItemToPersonFormSlice from "./user-state/addItemToPersonFormState";
import paginationSliceReducer from "./paginationSlice";
import searchSlice from "./searchSlice";
import activeModuleReduced from "./moduleSlice";
import itemMenuReducer from "./item-state/itemMenuSlice";
import ItemToEditReducer from "./item-state/itemToEditSlice";
import openBoxSlice from "./exchange-state/openBoxCodeSlice";
import exchangeIdFromItemSlice from "./exchange-state/exhcnageFromItemsSlice";

export const store = configureStore({
  reducer: {
    friendsMenu: friendsMenuReducer,
    user: userReducer,
    errorPopUp: errorPopUpReducer,
    infroPopup: infoPopUpSlice,
    profileUser: profileUserReducer,
    pagination: paginationSliceReducer,
    search: searchSlice,
    activeModule: activeModuleReduced,
    itemsMenu: itemMenuReducer,
    itemToEdit: ItemToEditReducer,
    addItemToPersonForm: addItemToPersonFormSlice,
    openBox: openBoxSlice,
    exchangeIdFromItem: exchangeIdFromItemSlice,
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
