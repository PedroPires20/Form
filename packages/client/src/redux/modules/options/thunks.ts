import axios from "axios"
import { GET_FIELD_OPTIONS } from "../../../shared/urls"
import { AppThunk } from "../../store"
import { optionsReceived } from "./slice"
import { FieldOption } from "./types"

export function fetchFieldOptions(fieldId: string): AppThunk {
  return (dispatch) => {
    axios.get<FieldOption[]>(GET_FIELD_OPTIONS(fieldId)).then(({ data }) => {
      dispatch(optionsReceived(data))
    })
  }
}
