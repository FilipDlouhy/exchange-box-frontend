import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorPopUpState {
  open: boolean;
  message: string;
}

const initialState: ErrorPopUpState = {
  open: false,
  message: "",
};

const errorPopUpSlice = createSlice({
  name: "errorPopUp",
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.message = action.payload;
    },
    hideError: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showError, hideError } = errorPopUpSlice.actions;

export default errorPopUpSlice.reducer;
