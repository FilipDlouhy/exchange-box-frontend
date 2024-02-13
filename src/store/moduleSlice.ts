import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nameOfActiveModule: "",
};

const activeModuleSlice = createSlice({
  name: "activeModule",
  initialState,
  reducers: {
    setActiveModuleName: (state, action) => {
      state.nameOfActiveModule = action.payload;
    },
  },
});

export const { setActiveModuleName } = activeModuleSlice.actions;
export default activeModuleSlice.reducer;
