import { createSlice } from "@reduxjs/toolkit";

type UserState = {
};

const initialState: UserState = {
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
});

export const userReducer = userSlice.reducer;

export const {
  
} = userSlice.actions;
