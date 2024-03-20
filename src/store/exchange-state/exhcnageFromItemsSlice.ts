import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExchangeIdFromItemState {
  exchangeIdFromItem: number | null;
}

const initialState: ExchangeIdFromItemState = {
  exchangeIdFromItem: null,
};

const exchangeIdFromItemSlice = createSlice({
  name: "exchangeIdFromItem",
  initialState,
  reducers: {
    setExchangeIdFromItem: (state, action: PayloadAction<number>) => {
      state.exchangeIdFromItem = action.payload;
    },
  },
});

export const { setExchangeIdFromItem } = exchangeIdFromItemSlice.actions;

export default exchangeIdFromItemSlice.reducer;
