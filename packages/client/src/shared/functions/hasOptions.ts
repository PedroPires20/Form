import { FieldTypes } from "../../redux/modules/forms/types"

export function hasOptions(fieldType: FieldTypes) {
  return ["checkbox", "radio", "select"].includes(fieldType)
}
