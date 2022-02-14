import { useRef } from "react"
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

/* 
  Auxiliary function that converts an array of objects to a CSV string. The objects
  in the array must all have the same keys and the keys are used as the CSV header.
  Each object values represents a row of the resulting CSV table. The object values
  must be strings or convertible to strings
*/
function objArrayToCSV(objects: any[]): string {
  const stringfy = (value: any) => value? String(value): ''
  const escape = (str: string) => str.match(/(,|"|\n|\r)/g)? `"${str.replace(/"/g, '""')}"`: str
  const keys = Object.keys(objects[0])
  const header = keys.map(key => escape(key))
  const csvLines = [
    header.join(','),
    ...objects.map(obj => keys.map(key => escape(stringfy(obj[key]))).join(','))
  ]
  return csvLines.join('\r\n');
}

export function FormListItem({ form }: Props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const downloadLink = useRef<HTMLAnchorElement>(null)

  async function handleResultsDownload() {
    try {
      const responseData = await axios.get(GET_FORM_RESULTS(form.id))
      if(responseData.status < 200 || responseData.status >= 300)
        throw `O servidor retornou um código de erro: ${responseData.status}`
      const fieldData = await axios.get(GET_FORM_FIELDS(form.id))
      if(fieldData.status < 200 || fieldData.status >= 300)
        throw `O servidor retornou um código de erro: ${fieldData.status}`
      type ResultEntry = { [key: string]: string | string[] }
      let entryModel = {} as ResultEntry
      type FieldDataMap = { [key: string]: string }
      let fieldNames = {} as FieldDataMap
      let fieldTypes = {} as FieldDataMap
      type FieldOptionMap = { [key: string]: { [key: string]: string } }
      let fieldOptions = {} as FieldOptionMap
      for(let field of fieldData.data) {
        fieldNames[field.id] = field.label
        fieldTypes[field.id] = field.type
        entryModel[field.label] = (field.type === "checkbox")? []: ''
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
            if(value.optionValues.length > 1) {
              let optionNames: string[] = []
              for(let option of value.optionValues)
                optionNames.push(fieldOptions[option.fieldId][option.optionId])
              responseEntry[fieldNames[value.optionValues[0].fieldId]] = optionNames
            }else {
              const option = value.optionValues[0]
              responseEntry[fieldNames[option.fieldId]] = fieldOptions[option.fieldId][option.optionId]
            }
          }else {
            responseEntry[fieldNames[value.fieldValue.fieldId]] = value.fieldValue.value
          }
        }
        results.push(responseEntry)
      }
      const csvData = objArrayToCSV(results)
      const dataBlob = new Blob(['\ufeff', csvData])
      const downloadUrl = URL.createObjectURL(dataBlob)
      if(!downloadLink.current)
        throw "Erro: elemento de download não encontrado"
      downloadLink.current.href = downloadUrl
      downloadLink.current.download = `${form.title}-resultados.csv`
      downloadLink.current.click()
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
      <a ref={downloadLink} style={{display: "none"}} href=""/>
    </FormListItemContainer>
  )
}
