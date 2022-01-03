import { createSlice } from "@reduxjs/toolkit";

type FormsState = {
};

const initialState: FormsState = {
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
  },
});

export const formsReducer = formsSlice.reducer;

export const {
  
} = formsSlice.actions;
