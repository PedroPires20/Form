import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { flipProp } from "../../../shared/functions/flipProp"
import { Field, FieldsState } from "./types"

const initialState: FieldsState = {
  byId: {},
}

export const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    fieldsReceived: (state, action: PayloadAction<Field[]>) => {
      action.payload.forEach((field) => {
        state.byId[field.id] = field
      })
    },
    fieldAdded: (state, action: PayloadAction<Omit<Field, "order">>) => {
      const order = Object.keys(state.byId)
        .map(flipProp(state.byId))
        .filter((field) => field.formId === action.payload.formId).length
      state.byId[action.payload.id] = { ...action.payload, order }
    },
    fieldChanged: (state, action: PayloadAction<Field>) => {
      state.byId[action.payload.id] = action.payload
    },
    fieldOrderChanged: (
      state,
      action: PayloadAction<{ field: Field; delta: number }>
    ) => {
      const { delta, field } = action.payload
      const currentOrder = state.byId[field.id].order
      const targetPositionId = Object.keys(state.byId)
        .map(flipProp(state.byId))
        .filter((fiel) => fiel.formId === field.formId)
        .find((fie) => fie.order === currentOrder + delta)?.id

      console.log(currentOrder, targetPositionId)

      if (targetPositionId) {
        state.byId[field.id].order = currentOrder + delta
        state.byId[targetPositionId].order = currentOrder
      }
    },
    fieldDeleted: (state, action: PayloadAction<Field>) => {
      delete state.byId[action.payload.id]
      Object.keys(state.byId).forEach((key) => {
        if (state.byId[key].order > action.payload.order) {
          state.byId[key].order -= 1
        }
      })
    },
  },
})

export const fieldsReducer = fieldsSlice.reducer

export const {
  fieldAdded,
  fieldChanged,
  fieldOrderChanged,
  fieldDeleted,
  fieldsReceived,
} = fieldsSlice.actions
