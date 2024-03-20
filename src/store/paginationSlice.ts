import { createSlice } from "@reduxjs/toolkit";
import { PaginationState } from "../contants/PaginationInteface";

const initialState: PaginationState = {
  starting: 0,
  max: 10,
  showLoadMorButtons: true,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    incrementStarting: (state) => {
      if (state.starting !== null) {
        state.starting += 10;
      }
      if (state.max !== null) {
        state.max += 10;
      }
    },
    resetStarting: (state) => {
      state.starting = 1;
      state.max = 10;
      state.showLoadMorButtons = true;
    },

    hideButton: (state) => {
      state.showLoadMorButtons = false;
    },

    showButton: (state) => {
      state.showLoadMorButtons = true;
    },
  },
});

export const { incrementStarting, resetStarting, hideButton, showButton } =
  paginationSlice.actions;

export default paginationSlice.reducer;
