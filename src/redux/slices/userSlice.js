import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/constants";



const initialState = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
