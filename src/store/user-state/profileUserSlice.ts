import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileUserState {
  email: string | null;
  id: string | null;
  isFriend: boolean;
}

const initialState: ProfileUserState = {
  email: null,
  id: null,
  isFriend: false,
};

const profileUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileUser: (state, action: PayloadAction<ProfileUserState>) => {
      const { email, id, isFriend } = action.payload;
      state.email = email;
      state.id = id;
      state.isFriend = isFriend;
    },
    resetProfileUser: (state) => {
      state.email = initialState.email;
      state.id = initialState.id;
      state.isFriend = initialState.isFriend;
    },
  },
});

export const { setProfileUser, resetProfileUser } = profileUserSlice.actions;

export default profileUserSlice.reducer;
