import { AppThunk } from "../../store"

export function getAllForms(): AppThunk {
  return () => {}
}

export function saveForm(): AppThunk {
  return (dispatch, getState) => {
    console.log({ fields: getState().fields, options: getState().options })
  }
}
