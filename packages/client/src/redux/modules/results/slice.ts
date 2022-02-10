import { createSlice } from "@reduxjs/toolkit"
import { ResultsState } from "./types"

const initialState: ResultsState = {
  loading: false,
}

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    resultRequest: (state) => {
      state.loading = true
    },
    answerSent: (state) => {
      state.loading = false
    },
    sendAnswerFailed: (state) => {
      state.loading = false
    },
  },
})

export const resultsReducer = resultsSlice.reducer

export const { sendAnswerFailed, answerSent, resultRequest } =
  resultsSlice.actions
