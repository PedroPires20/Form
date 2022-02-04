import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Form, FormState } from "./types"

const initialState: FormState = {
  id: "",
  title: null,
  description: null,
  all: [],
}

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    titleChanged: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    formsReceived: (state, action: PayloadAction<Form[]>) => {
      state.all = action.payload
    },
  },
})

export const formReducer = formSlice.reducer

export const { descriptionChanged, formsReceived, titleChanged } =
  formSlice.actions
