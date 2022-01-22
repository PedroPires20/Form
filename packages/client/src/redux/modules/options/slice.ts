import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FieldOption, OptionsState } from "./types"

const initialState: OptionsState = {
  byId: {},
}

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    optionAdded: (state, action: PayloadAction<FieldOption>) => {},
    optionChanged: (state, action: PayloadAction<FieldOption>) => {},
    optionDeleted: (state, action: PayloadAction<FieldOption>) => {},
  },
})

export const optionsReducer = optionsSlice.reducer

export const { optionAdded, optionChanged, optionDeleted } = optionsSlice.actions
