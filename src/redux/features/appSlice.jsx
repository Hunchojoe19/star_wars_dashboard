import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "dashboard",
  user: "",
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setActiveTab, setUser } = appSlice.actions;
export default appSlice.reducer;
