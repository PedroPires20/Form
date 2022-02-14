import {
  FormListItemContainer,
  FormInfoContainer,
  FromTitle,
  FormDescription,
  FromButtonsContainer,
} from "./FormListItemStyles"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { Form } from "../../redux/modules/forms/types"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { formDeleted } from "../../redux/modules/forms/slice"
import { deleteForm } from "../../redux/modules/forms/thunks"
import axios from "axios"
import { GET_FIELD_OPTIONS, GET_FORM_FIELDS, GET_FORM_RESULTS } from "../../shared/urls"

type Props = {
  form: Form
}

export function FormListItem({ form }: Props) {
  const history = useHistory()
  const dispatch = useDispatch()

  async function handleResultsDownload() {
    try {
      const responseData = await axios.get(GET_FORM_RESULTS(form.id))
      if(responseData.status < 200 || responseData.status >= 300)
        throw `O servidor retornou um código de erro: ${responseData.status}`
      const fieldData = await axios.get(GET_FORM_FIELDS(form.id))
      if(fieldData.status < 200 || fieldData.status >= 300)
        throw `O servidor retornou um código de erro: ${fieldData.status}`
      type ResultEntry = { [key: string]: string }
      let entryModel = {} as ResultEntry
      type FieldNameMap = { [key: string]: string }
      let fieldNames = {} as FieldNameMap
      type FieldOptionMap = { [key: string]: { [key: string]: string } }
      let fieldOptions = {} as FieldOptionMap
      for(let field of fieldData.data) {
        fieldNames[field.id] = field.label
        entryModel[field.label] = ''
        if(field.type === "checkbox" || field.type === "radio") {
          const optionData = await axios.get(GET_FIELD_OPTIONS(field.id))
          if(optionData.status < 200 || optionData.status >= 300)
            throw `O servidor retornou um código de erro: ${optionData.status}`
          let optionMapping = {} as { [key: string]: string }
          for(let option of optionData.data) {
            optionMapping[option.id] = option.name
          }
          fieldOptions[field.id] = optionMapping
        }
      }
      let results: ResultEntry[] = []
      for(let response of responseData.data) {
        let responseEntry = {...entryModel}
        for(let value of response.resultItems) {
          if(Array.isArray(value.optionValues) && value.optionValues.length > 0) {
            for(let option of value.optionValues) {
              responseEntry[fieldNames[option.fieldId]] = fieldOptions[option.fieldId][option.optionId]
            }
          }else {
            responseEntry[fieldNames[value.fieldValue.fieldId]] = value.fieldValue.value
          }
        }
        results.push(responseEntry)
      }
      console.log(results)
    }catch(e) {
      console.log("Erro ao obter os resultados do formulário:")
      console.log(e)
    }
  }

  return (
    <FormListItemContainer>
      <FormInfoContainer>
        <FromTitle>{form.title}</FromTitle>
        <FormDescription>{form.description}</FormDescription>
      </FormInfoContainer>
      <FromButtonsContainer>
        <ActionButton
          icon="pencil"
          tooltip="Editar form"
          onClick={() => {
            history.push("/edit/" + form.id)
          }}
        />
        <ActionButton
          icon="arrowDownToBracket"
          tooltip="Baixar resultados"
          color="var(--primary)"
          onClick={handleResultsDownload}
        />
        <ActionButton
          icon="arrowRightFromBracket"
          tooltip="Visualizar form"
          color="orange"
          onClick={() => {
            history.push("/view/" + form.id)
          }}
        />
        <ActionButton
          icon="xmark"
          tooltip="Apagar formulário"
          color="var(--error)"
          onClick={() => {
            dispatch(deleteForm(form.id))
          }}
        />
      </FromButtonsContainer>
    </FormListItemContainer>
  )
}
