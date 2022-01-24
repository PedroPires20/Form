import axios from "axios"
import { flipProp } from "../../../shared/functions/flipProp"
import {CREATE_FORM} from "../../../shared/urls"
import { AppThunk } from "../../store"

export function getAllForms(): AppThunk {
  return () => {}
}

const exampleForm = {
  title: "Test form",
  description: "Description test form",
  userId: "03d66140-c91f-45ef-afbf-489e6a161c92",
  fields: [
    {
      type: "text",
      description: null,
      label: "Label Field 1",
      order: 0,
      options: [],
    },
    {
      type: "checkbox",
      description: "Field 2",
      label: "Label Field 2",
      order: 1,
      options: [
        { name: "option 5", value: "5", order: 0 },
        { name: "option 6", value: "6", order: 1 },
        { name: "option 7", value: "7", order: 2 },
        { name: "option 8", value: "8", order: 3 },
      ],
    },
  ],
}

export function saveForm(): AppThunk {
  return (dispatch, getState) => {
    const options = getState().options
    const fields = getState().fields
    const form = getState().form

    const fieldsIds = Object.keys(fields.byId)
    const optionsIds = Object.keys(options.byId)

    const requestForm = {
      //id: form.id,
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

    axios.post(CREATE_FORM, requestForm).then(res => console.log(res.data))
  }
}
