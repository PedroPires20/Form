import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { flipProp } from "../../../shared/functions/flipProp"
import { FieldOption, OptionsState } from "./types"

const initialState: OptionsState = {
  byId: {},
}

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    optionsReceived: (state, action: PayloadAction<FieldOption[]>) => {
      action.payload.forEach((option) => {
        state.byId[option.id] = option
      })
    },
    optionAdded: (state, action: PayloadAction<Omit<FieldOption, "order">>) => {
      const order = Object.keys(state.byId)
        .map(flipProp(state.byId))
        .filter((option) => option.fieldId === action.payload.fieldId).length
      state.byId[action.payload.id] = { ...action.payload, order }
    },
    optionChanged: (state, action: PayloadAction<FieldOption>) => {
      state.byId[action.payload.id] = action.payload
    },
    optionOrderChanged: (
      state,
      action: PayloadAction<{ option: FieldOption; delta: number }>
    ) => {
      const { delta, option } = action.payload
      const currentOrder = state.byId[option.id].order
      const targetPositionId = Object.keys(state.byId)
        .map(flipProp(state.byId))
        .filter((opt) => opt.fieldId === option.fieldId)
        .find((opt) => opt.order === currentOrder + delta)?.id

      console.log(currentOrder, targetPositionId)

      if (targetPositionId) {
        state.byId[option.id].order = currentOrder + delta
        state.byId[targetPositionId].order = currentOrder
      }
    },
    optionDeleted: (state, action: PayloadAction<FieldOption>) => {
      delete state.byId[action.payload.id]
      Object.keys(state.byId).forEach((key) => {
        if (
          state.byId[key].fieldId === action.payload.fieldId &&
          state.byId[key].order > action.payload.order
        ) {
          state.byId[key].order -= 1
        }
      })
    },
  },
})

export const optionsReducer = optionsSlice.reducer

export const {
  optionAdded,
  optionChanged,
  optionOrderChanged,
  optionDeleted,
  optionsReceived,
} = optionsSlice.actions
