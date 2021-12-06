import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ExampleState = {
  loading: boolean
  error: boolean
  data?: { example: string }
}

const initialState: ExampleState = {
  loading: false,
  error: false,
}

export const exampleSlice = createSlice({
  name: "exampleSlice",
  initialState,
  reducers: {
    exampleRequest: (state) => {
      state.loading = true
    },
    getExampleSuccess: (state, action: PayloadAction<{ example: string }>) => {
      state.loading = false
      state.data = action.payload
    },
    getExampleFailed: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const exampleReducer = exampleSlice.reducer

export const { exampleRequest, getExampleFailed, getExampleSuccess } =
  exampleSlice.actions
