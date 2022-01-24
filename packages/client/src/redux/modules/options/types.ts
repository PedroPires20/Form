import { FieldId } from "../fields/types"

export type OptionId = string
export type FieldOption = {
  id: OptionId
  order: number
  fieldId: FieldId
  name: string
  value: string
}

export type OptionsState = {
  byId: { [key: string]: FieldOption }
}
