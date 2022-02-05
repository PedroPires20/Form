export const BASE_URL = "http://localhost:3000"

export const GET_EXAMPLE = `${BASE_URL}/example`

export const CREATE_FORM = `${BASE_URL}/forms`
export const UPDATE_FORM = `${BASE_URL}/forms`
export const GET_USER_FORMS = `${BASE_URL}/forms`
export const GET_FORM_FIELDS = (formId: string) => `${BASE_URL}/fields/form/${formId}`
export const GET_FIELD_OPTIONS = (fieldId: string) => `${BASE_URL}/options/field/${fieldId}`
