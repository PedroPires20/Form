export type OptionId = string
export type FieldId = string

export type FieldOption = {
  id: OptionId
  fieldId: FieldId
  name: string
  value: string
}

export type FieldTypes = "text" | "textarea" | "select" | "radio" | "checkbox"

export type Field = {
  id: string
  type: FieldTypes
  label: string
  options: OptionId[]
  description?: string
}

export type Form = {
  id: string
  title: string
  description: string
}

export type FormState = {
  all: Form[]
  options: FieldOption[]
  fields: Field[]
  title: string;
  description: string;
}
