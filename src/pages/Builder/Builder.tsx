import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import {InputType} from "../../components/InputType/InputType"
import { TextInput } from "../../components/TextInput/TextInput"
import {
  BuilderContainer,
  DescriptionContainer,
  BuilderDescription,
  BuilderForm,
  BuilderSubmit,
  TitleContainer,
  BuilderTitle,
  BuilderFields,
  EditTitle,
  EditDescription,
  NameInput,
  DescriptionInput
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
  const [editName, toggleEditName] = useState(true)
  const [editDesc, toggleEditDesc] = useState(false)
  const methods = useForm<BuilderFormValues>({defaultValues: {name: "Nome do formulário", description: "Descrição"}})
  const name = methods.getValues("name")
  const description = methods.getValues("description")

  function handleFieldAdd(inputType: string) {
    let currentFields = fields.slice()
    currentFields.push(<FieldBuilder index={currentFields.length} defaultName="Novo input" defaultType={inputType}/>)
    setFields(currentFields)
  }

  return (
    <FormProvider {...methods}>
      <BuilderContainer>
        <BuilderForm>
          <TitleContainer>
            {editName? 
              <NameInput 
              {...methods.register("name", {required: true})}
              onKeyDown={(e) => e.key === "Enter" && toggleEditName(false)}
              autoFocus
              />:
              <BuilderTitle>{name}</BuilderTitle>
            }
            <EditTitle 
            onClick={(e) => {
              e.preventDefault()
              toggleEditName(true)
            }}
            />
          </TitleContainer>
          <DescriptionContainer>
            {editDesc? 
              <DescriptionInput 
              {...methods.register("description", {required: true})}
              onKeyDown={(e) => e.key === "Enter" && toggleEditDesc(false)}
              />:
              <BuilderDescription>{description}</BuilderDescription>
            }
            <EditDescription
            onClick={(e) => {
              e.preventDefault()
              toggleEditDesc(true)
            }}
            />
          </DescriptionContainer>
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
