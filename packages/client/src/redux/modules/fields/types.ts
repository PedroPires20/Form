import { OptionId } from "../options/types"

export type FieldId = string

export type FieldWithOption = "checkbox" | "radio" | "select"
export type FieldTypes = "text" | "textarea" | "select" | "radio" | "checkbox"

export type Field = {
  id: string
  type: FieldTypes
  label: string
  options: OptionId[]
  description?: string
}

export type FieldsState = {
  byId: { [key: string]: Field }
}
