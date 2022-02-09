import axios from "axios"
import { GET_FORM_FIELDS } from "../../../shared/urls"
import { AppThunk } from "../../store"
import { fetchFieldOptions } from "../options/thunks"
import { fieldsReceived } from "./slice"
import { Field } from "./types"

export function fetchFormFields(formId: string): AppThunk {
  return (dispatch) => {
    axios.get<Field[]>(GET_FORM_FIELDS(formId)).then(({ data }) => {
      dispatch(fieldsReceived(data))
      data.forEach((field) => {
        dispatch(fetchFieldOptions(field.id))
      })
    })
  }
}
