import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FormState } from "./types"

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
  },
})

export const formReducer = formSlice.reducer

export const { descriptionChanged, titleChanged } = formSlice.actions
