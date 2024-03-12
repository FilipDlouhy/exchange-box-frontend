import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoxState {
  openBoxCode: string;
}

const initialState: BoxState = {
  openBoxCode: "",
};

const openBoxSlice = createSlice({
  name: "box",
  initialState,
  reducers: {
    setOpenBoxCode: (state, action: PayloadAction<string>) => {
      state.openBoxCode = action.payload;
    },
    resetOpenBoxCode: (state) => {
      state.openBoxCode = "";
    },
  },
});

export const { setOpenBoxCode, resetOpenBoxCode } = openBoxSlice.actions;

export default openBoxSlice.reducer;
