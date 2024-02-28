import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemInterface } from "../../components/main-components/item-components/Interfaces/ItemInterface";

interface ItemToEditState {
  item: ItemInterface | null;
}

const initialState: ItemToEditState = {
  item: null,
};

const itemToEditSlice = createSlice({
  name: "itemToEdit",
  initialState,
  reducers: {
    setItemToEdit: (state, action: PayloadAction<ItemInterface>) => {
      state.item = action.payload;
    },
    resetItemToEdit: (state) => {
      state.item = null;
    },
  },
});

export const { setItemToEdit, resetItemToEdit } = itemToEditSlice.actions;

export default itemToEditSlice.reducer;
