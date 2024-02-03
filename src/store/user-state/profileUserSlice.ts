import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfleUserState {
  email: string | null;
  id: string | null;
}

const initialState: ProfleUserState = {
  email: null,
  id: null,
};

const profileUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileUser: (state, action: PayloadAction<ProfleUserState>) => {
      const { email, id } = action.payload;
      state.email = email;
      state.id = id;
    },
    resetProfileUser: (state) => {
      state.email = initialState.email;
      state.id = initialState.id;
    },
  },
});

export const { setProfileUser, resetProfileUser } = profileUserSlice.actions;
export default profileUserSlice.reducer;
