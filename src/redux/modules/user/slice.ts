import { createSlice } from "@reduxjs/toolkit";

type UserState = {
};

const initialState: UserState = {
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
});

export const usersReducer = usersSlice.reducer;

export const {
  
} = usersSlice.actions;
