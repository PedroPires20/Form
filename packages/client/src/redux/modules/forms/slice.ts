import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Field, FormState } from "./types"

const initialState: FormState = {
  all: [],
  options: [],
  fields: [],
  title: "",
  description: "",
}

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    fieldAdded: (state, action: PayloadAction<Field>) => {},
    fieldChanged: (state, action: PayloadAction<Field>) => {},
    fieldDeleted: (state, action: PayloadAction<Field>) => {},
  },
})

export const formReducer = formSlice.reducer

export const { fieldAdded, fieldChanged, fieldDeleted } = formSlice.actions
