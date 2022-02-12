import axios from "axios"
import { flipProp } from "../../../shared/functions/flipProp"
import {
  CREATE_FORM,
  DELETE_FORM,
  GET_USER_FORMS,
  UPDATE_FORM,
} from "../../../shared/urls"
import { AppThunk } from "../../store"
import { fetchFormFields } from "../fields/thunks"
import {
  currentFormChanged,
  formAdded,
  formDeleted,
  formRequest,
  formRequestError,
  formsReceived,
  formUpdated,
} from "./slice"
import { Form } from "./types"

export function getAllForms(): AppThunk {
  return (dispatch) => {
    axios.get(GET_USER_FORMS).then((res) => {
      dispatch(formsReceived(res.data))
    })
  }
}

export function saveForm(
  mode: "create" | "edit",
  callback: () => void
): AppThunk {
  return (dispatch, getState) => {
    dispatch(formRequest())
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
      axios
        .post<Form>(CREATE_FORM, requestForm)
        .then((res) => {
          callback()
          dispatch(formAdded(res.data))
        })
        .catch((err) => {
          dispatch(formRequestError())
          console.log(err)
        })
    } else if (mode === "edit") {
      axios
        .put(UPDATE_FORM, requestForm)
        .then(() => {
          callback()
          dispatch(
            formUpdated({
              id: form.id,
              title: form.title,
              description: form.description,
            } as Form)
          )
        })
        .catch((err) => {
          dispatch(formRequestError())
          console.log(err)
        })
    }
  }
}

export function changeCurrentForm(id: string): AppThunk {
  return (dispatch) => {
    dispatch(currentFormChanged({ id }))
    dispatch(fetchFormFields(id))
  }
}

export function deleteForm(formId: string): AppThunk {
  return (dispatch) => {
    dispatch(formDeleted({ id: formId }))
    axios
      .delete(DELETE_FORM(formId))
      .then(() => console.log("form deleted", formId))
  }
}
