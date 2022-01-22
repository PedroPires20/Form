import { FieldTypes, FieldWithOption } from "../../redux/modules/forms/types"

export function hasOptions(
  fieldType: FieldTypes
): fieldType is FieldWithOption {
  return ["checkbox", "radio", "select"].includes(fieldType)
}
