export type FieldId = string

export type FieldWithOption = "checkbox" | "radio" | "select"
export type FieldTypes = "text" | "textarea" | "select" | "radio" | "checkbox"

export type Field = {
  id: string
  type: FieldTypes
  order: number
  label: string
  description?: string | null
  formId: string | null
}

export type FieldsState = {
  byId: { [key: string]: Field }
}
