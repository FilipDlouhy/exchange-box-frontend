import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FriendsMenuState {
  value: string;
}

const initialState: FriendsMenuState = {
  value: "",
};

const friendsMenuSlice = createSlice({
  name: "friendsMenu",
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<string>) => {
      localStorage.setItem("friendsActiveMenu", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setActiveMenu } = friendsMenuSlice.actions;

export default friendsMenuSlice.reducer;
