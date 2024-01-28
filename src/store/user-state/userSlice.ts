import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  id: string;
  telephone?: string;
  longitude?: number;
  latitude?: number;
  address?: string;
  imageUrl?: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  id: "",
  telephone: undefined,
  longitude: undefined,
  latitude: undefined,
  address: undefined,
  imageUrl: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const {
        name,
        email,
        id,
        telephone,
        longitude,
        latitude,
        address,
        imageUrl,
      } = action.payload;

      state.name = name;
      state.email = email;
      state.id = id;
      state.telephone = telephone;
      state.longitude = longitude;
      state.latitude = latitude;
      state.address = address;
      state.imageUrl = imageUrl;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
