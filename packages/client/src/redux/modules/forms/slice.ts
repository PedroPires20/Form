import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FormState } from "./types"

const initialState: FormState = {
  id: "",
  title: "",
  description: "",
  all: [],
}

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
  },
})

export const formReducer = formSlice.reducer

export const { } = formSlice.actions
