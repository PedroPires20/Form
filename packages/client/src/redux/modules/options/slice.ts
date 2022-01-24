import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { flipProp } from "../../../shared/functions/flipProp"
import { FieldOption, OptionsState } from "./types"

const initialState: OptionsState = {
  byId: {
    "1e16063f-a5c2-413f-9cdb-40077971109c": {
      id: "1e16063f-a5c2-413f-9cdb-40077971109c",
      fieldId: "89bfcb5f-a582-4f02-9f80-d1312c8806d7",
      name: "AVAX",
      value: "false",
      order: 1,
    },
    "644a91be-7385-4365-83eb-992a6e097bfa": {
      id: "644a91be-7385-4365-83eb-992a6e097bfa",
      fieldId: "89bfcb5f-a582-4f02-9f80-d1312c8806d7",
      name: "MATIC",
      value: "false",
      order: 2,
    },
    "9ca5e975-1473-45e0-a745-d44177fb4445": {
      id: "9ca5e975-1473-45e0-a745-d44177fb4445",
      fieldId: "89bfcb5f-a582-4f02-9f80-d1312c8806d7",
      name: "BNB",
      value: "false",
      order: 3,
    },
    "a2f24884-a0f9-4d24-af0d-0588e6ef0578": {
      id: "a2f24884-a0f9-4d24-af0d-0588e6ef0578",
      fieldId: "89bfcb5f-a582-4f02-9f80-d1312c8806d7",
      name: "MM",
      value: "false",
      order: 4,
    },
    "15d6718f-3394-418d-88e0-7566f806e71b": {
      id: "15d6718f-3394-418d-88e0-7566f806e71b",
      fieldId: "89bfcb5f-a582-4f02-9f80-d1312c8806d7",
      name: "DODGE",
      value: "false",
      order: 0,
    },
    "1c94f84b-c759-4c0a-8487-ec15e7203191": {
      id: "1c94f84b-c759-4c0a-8487-ec15e7203191",
      fieldId: "21aa1196-d551-4de5-bed9-15641b8c5442",
      name: "Harmony",
      value: "false",
      order: 0,
    },
    "3b94a12d-0f98-44ec-b994-099f61b5888c": {
      id: "3b94a12d-0f98-44ec-b994-099f61b5888c",
      fieldId: "21aa1196-d551-4de5-bed9-15641b8c5442",
      name: "Polygon",
      value: "false",
      order: 1,
    },
    "f7ef1870-eb19-49a5-8611-d162f9b6a4d4": {
      id: "f7ef1870-eb19-49a5-8611-d162f9b6a4d4",
      fieldId: "21aa1196-d551-4de5-bed9-15641b8c5442",
      name: "Binance Smart Chain",
      value: "false",
      order: 2,
    },
  },
}

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
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

export const { optionAdded, optionChanged, optionOrderChanged, optionDeleted } =
  optionsSlice.actions
