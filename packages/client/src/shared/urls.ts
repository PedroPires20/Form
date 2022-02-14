export const BASE_URL = process.env.NODE_ENV === "production" ? "https://si-ufmg-form.herokuapp.com" : "http://localhost:3000"

export const GET_EXAMPLE = `${BASE_URL}/example`

export const CREATE_FORM = `${BASE_URL}/forms`
export const UPDATE_FORM = `${BASE_URL}/forms`
export const DELETE_FORM = (formId: string) => `${BASE_URL}/forms/${formId}`
export const GET_USER_FORMS = `${BASE_URL}/forms`
export const GET_FORM_FIELDS = (formId: string) => `${BASE_URL}/fields/form/${formId}`
export const GET_FIELD_OPTIONS = (fieldId: string) => `${BASE_URL}/options/field/${fieldId}`

export const SEND_ANWER = `${BASE_URL}/results`
export const GET_FORM_RESULTS = (formId: string) => `${BASE_URL}/results/${formId}`
