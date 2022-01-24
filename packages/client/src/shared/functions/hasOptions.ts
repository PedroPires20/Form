import { FieldTypes, FieldWithOption } from "../../redux/modules/fields/types"

export function hasOptions(
  fieldType: FieldTypes
): fieldType is FieldWithOption {
  return ["checkbox", "radio", "select"].includes(fieldType)
}
