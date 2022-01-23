import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Field, FieldsState } from "./types"

const initialState: FieldsState = {
  byId: {},
}

export const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    fieldAdded: (state, action: PayloadAction<Omit<Field, "order">>) => {
      const order = Object.keys(state.byId).length
      state.byId[action.payload.id] = { ...action.payload, order }
    },
    fieldChanged: (state, action: PayloadAction<Field>) => {
      state.byId[action.payload.id] = action.payload
    },
    fieldDeleted: (state, action: PayloadAction<Field>) => {},
  },
})

export const fieldsReducer = fieldsSlice.reducer

export const { fieldAdded, fieldChanged, fieldDeleted } = fieldsSlice.actions
