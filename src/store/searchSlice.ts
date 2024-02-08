import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearSearchText: (state) => {
      state.searchText = "";
    },
  },
});

export const { setSearchText, clearSearchText } = searchSlice.actions;

export default searchSlice.reducer;
