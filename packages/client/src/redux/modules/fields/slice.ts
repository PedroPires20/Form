import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { flipProp } from "../../../shared/functions/flipProp"
import { Field, FieldsState } from "./types"

const initialState: FieldsState = {
  byId: {
    "6a6485f4-9e7b-4e47-ad87-0c0c60637f8f": {
      id: "6a6485f4-9e7b-4e47-ad87-0c0c60637f8f",
      type: "text",
      label: "Insira o seu nome",
      description: null,
      options: [],
      order: 0,
    },
    "89bfcb5f-a582-4f02-9f80-d1312c8806d7": {
      id: "89bfcb5f-a582-4f02-9f80-d1312c8806d7",
      type: "checkbox",
      label: "Criptos que gosta",
      description: "Selecione uma ou mais criptos que goste",
      options: [],
      order: 1,
    },
    "8dd20b2b-b2d5-49a5-b27d-a5d2af5c3fed": {
      id: "8dd20b2b-b2d5-49a5-b27d-a5d2af5c3fed",
      type: "textarea",
      label: "Descreva seu protocolo favorito",
      description: null,
      options: [],
      order: 2,
    },
    "21aa1196-d551-4de5-bed9-15641b8c5442": {
      id: "21aa1196-d551-4de5-bed9-15641b8c5442",
      type: "radio",
      label: "Chain preferida",
      description: null,
      options: [],
      order: 3,
    },
  },
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
    fieldOrderChanged: (
      state,
      action: PayloadAction<{ field: Field; delta: number }>
    ) => {
      const { delta, field } = action.payload
      const currentOrder = state.byId[field.id].order
      const targetPositionId = Object.keys(state.byId)
        .map(flipProp(state.byId))
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

export const { fieldAdded, fieldChanged, fieldOrderChanged, fieldDeleted } =
  fieldsSlice.actions
