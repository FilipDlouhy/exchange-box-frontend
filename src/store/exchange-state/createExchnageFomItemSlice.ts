import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateExchangeFromItemState {
  isCreatingFromItems: boolean;
  friendId: number | null;
  itemId: number | null;
}

const initialState: CreateExchangeFromItemState = {
  isCreatingFromItems: false,
  friendId: null,
  itemId: null,
};

interface SetExchangeCreationStatePayload {
  isCreatingFromItems: boolean;
  friendId: number | null;
  itemId: number | null;
}

const createExchangeFromItemSlice = createSlice({
  name: "createExchangeFromItem",
  initialState,
  reducers: {
    setExchangeCreationState: (
      state,
      action: PayloadAction<SetExchangeCreationStatePayload>
    ) => {
      const { isCreatingFromItems, friendId, itemId } = action.payload;
      state.isCreatingFromItems = isCreatingFromItems;
      state.friendId = friendId;
      state.itemId = itemId;
    },
    resetExchangeCreationState: (state) => {
      state.isCreatingFromItems = initialState.isCreatingFromItems;
      state.friendId = initialState.friendId;
      state.itemId = initialState.itemId;
    },
  },
});

export const { setExchangeCreationState, resetExchangeCreationState } =
  createExchangeFromItemSlice.actions;

export default createExchangeFromItemSlice.reducer;
