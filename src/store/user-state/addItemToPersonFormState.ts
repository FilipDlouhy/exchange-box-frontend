import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FriendInfo } from "../../components/main-components/friend-components/Interfaces/FriendInterface";

interface FormState {
  openForm: boolean;
  user: FriendInfo | null;
}

const initialState: FormState = {
  openForm: false,
  user: null,
};

const addItemToPersonFormSlice = createSlice({
  name: "addItemToPersonForm",
  initialState,
  reducers: {
    openForm: (state) => {
      state.openForm = true;
    },
    closeForm: (state) => {
      state.openForm = false;
    },
    setAddItemUser: (state, action: PayloadAction<FriendInfo | null>) => {
      state.user = action.payload;
    },
  },
});

export const { openForm, closeForm, setAddItemUser } =
  addItemToPersonFormSlice.actions;

export default addItemToPersonFormSlice.reducer;
