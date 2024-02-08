import { createSlice } from "@reduxjs/toolkit";
import { PaginationState } from "../contants/PaginationInteface";

const initialState: PaginationState = {
  starting: 1,
  max: 10,
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
    },
  },
});

export const { incrementStarting, resetStarting } = paginationSlice.actions;

export default paginationSlice.reducer;
