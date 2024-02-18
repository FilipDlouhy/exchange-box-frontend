import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface itemsMenuState {
  value: string;
}

const initialState: itemsMenuState = {
  value: "",
};

const itemsMenuSlice = createSlice({
  name: "itemsMenu",
  initialState,
  reducers: {
    setActiveItemMenu: (state, action: PayloadAction<string>) => {
      localStorage.setItem("itemsActiveMenu", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setActiveItemMenu } = itemsMenuSlice.actions;

export default itemsMenuSlice.reducer;
