import axios from "axios"
import { flipProp } from "../../../shared/functions/flipProp"
import { CREATE_FORM, GET_USER_FORMS, UPDATE_FORM } from "../../../shared/urls"
import { AppThunk } from "../../store"
import { fetchFormFields } from "../fields/thunks"
import { currentFormChanged, formsReceived } from "./slice"

export function getAllForms(): AppThunk {
  return (dispatch) => {
    axios.get(GET_USER_FORMS).then((res) => {
      dispatch(formsReceived(res.data))
    })
  }
}

type SaveFormMode = "create" | "update"

export function saveForm(mode: SaveFormMode): AppThunk {
  return (dispatch, getState) => {
    const options = getState().options
    const fields = getState().fields
    const form = getState().form

    const fieldsIds = Object.keys(fields.byId)
    const optionsIds = Object.keys(options.byId)

    const requestForm = {
      id: form.id,
      title: form.title,
      description: form.description,
      userId: "03d66140-c91f-45ef-afbf-489e6a161c92",
      fields: fieldsIds.map((key) => {
        const field: any = { ...fields.byId[key] }
        field.options = optionsIds
          .map(flipProp(options.byId))
          .filter((option) => option.fieldId === field.id)

        return field
      }),
    }

    if (mode === "create") {
      axios.post(CREATE_FORM, requestForm).then((res) => console.log(res.data))
    } else if (mode === "update") {
      axios.put(UPDATE_FORM, requestForm).then((res) => console.log(res.data))
    }
  }
}

export function changeCurrentForm(id: string): AppThunk {
  return (dispatch) => {
    dispatch(currentFormChanged({ id }))
    dispatch(fetchFormFields(id))
  }
}
