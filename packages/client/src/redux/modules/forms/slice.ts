import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Form, FormState } from "./types"

const initialState: FormState = {
  id: null,
  title: null,
  description: null,
  loading: false,
  all: [],
}

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    formRequest: (state) => {
      state.loading = true
    },
    formRequestError: (state) => {
      state.loading = false
    },
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
    formAdded: (state, action: PayloadAction<Form>) => {
      const { payload } = action
      state.all.unshift({
        id: payload.id,
        title: payload.title,
        description: payload.description,
      })
      state.loading = false
    },
    formDeleted: (state, action: PayloadAction<{ id: string }>) => {
      state.all = state.all.filter((form) => form.id !== action.payload.id)
    },
    formUpdated: (state, action: PayloadAction<Form>) => {
      const form = state.all.find((form) => form.id === action.payload.id)
      if (form) {
        form.title = action.payload.title
        form.description = action.payload.description
      }
      state.loading = false
    },
    formsReceived: (state, action: PayloadAction<Form[]>) => {
      state.all = action.payload
    },
    clearForm: (state) => {
      state.id = null
      state.title = null
      state.description = null
    },
  },
})

export const formReducer = formSlice.reducer

export const {
  clearForm,
  currentFormChanged,
  descriptionChanged,
  formAdded,
  formDeleted,
  formRequest,
  formRequestError,
  formUpdated,
  formsReceived,
  titleChanged,
} = formSlice.actions
