import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InfoPopUpState {
  open: boolean;
  message: string;
}

const initialState: InfoPopUpState = {
  open: false,
  message: "",
};

const infoPopUpSlice = createSlice({
  name: "infoPopUp",
  initialState,
  reducers: {
    showInfo: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.message = action.payload;
    },
    hideInfo: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showInfo, hideInfo } = infoPopUpSlice.actions;

export default infoPopUpSlice.reducer;
