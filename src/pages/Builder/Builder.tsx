import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import {InputType} from "../../components/InputType/InputType"
import { TextInput } from "../../components/TextInput/TextInput"
import {
  BuilderContainer,
  BuilderDescription,
  BuilderForm,
  BuilderSubmit,
  BuilderTitle,
  BuilderFields,
} from "./BuilderStyles"
import { FieldBuilder } from "../../components/FieldBuilder/FieldBuilder"

interface BuilderFormValues {
  name: string
  description: string
  inputs: {
    name: string
    type: string
    label: string
    placeholder?: string
  }[]
}

export function Builder() {
  const [fields, setFields] = useState<JSX.Element[]>([])
  const methods = useForm<BuilderFormValues>()

  function handleFieldAdd(inputType: string) {
    let currentFields = fields.slice()
    currentFields.push(<FieldBuilder index={currentFields.length} defaultName="Novo input" defaultType={inputType}/>)
    setFields(currentFields)
  }

  return (
    <FormProvider {...methods}>
      <BuilderContainer>
        <BuilderForm>
          <BuilderTitle>Title</BuilderTitle>
          <BuilderDescription>Description</BuilderDescription>
          <BuilderFields>
            {fields}
          </BuilderFields>
          <InputType onChange={handleFieldAdd}/>
          <BuilderSubmit
            onClick={(e) => {
              e.preventDefault()
              console.log(methods.getValues())
            }}
          >
            Salvar
          </BuilderSubmit>
        </BuilderForm>
      </BuilderContainer>
    </FormProvider>
  )
}
