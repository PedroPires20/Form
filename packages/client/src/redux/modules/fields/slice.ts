import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Field, FieldsState } from "./types"

const initialState: FieldsState = {
  byId: {},
}

export const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    fieldAdded: (state, action: PayloadAction<Field>) => {},
    fieldChanged: (state, action: PayloadAction<Field>) => {},
    fieldDeleted: (state, action: PayloadAction<Field>) => {},
  },
})

export const fieldsReducer = fieldsSlice.reducer

export const { fieldAdded, fieldChanged, fieldDeleted } = fieldsSlice.actions
