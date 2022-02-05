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
    currentFormChanged: (state, action: PayloadAction<{ id: string }>) => {
      const form = state.all.find((form) => form.id === action.payload.id)
      if (form) {
        state.title = form.title
        state.description = form.description
        state.id = form.id
      }
    },
    formsReceived: (state, action: PayloadAction<Form[]>) => {
      state.all = action.payload
    },
  },
})

export const formReducer = formSlice.reducer

export const {
  currentFormChanged,
  descriptionChanged,
  formsReceived,
  titleChanged,
} = formSlice.actions
