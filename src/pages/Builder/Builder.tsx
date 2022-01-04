import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import {InputType} from "../../components/InputType/InputType"
import { TextInput } from "../../components/TextInput/TextInput"
import { getExample } from "../../redux/modules/example/thunks"
import { useAppDispatch, useAppSelector } from "../../redux/store"
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
  TitleInput,
  DescriptionInput
} from "./BuilderStyles"
import { FieldBuilder } from "../../components/FieldBuilder/FieldBuilder"

interface TextInputFormValues {
  type: "text"
  name: string
  label: string
  placeholder: string
}

interface RadioInputFormValues {
  type: "radio"
  name: string
  label: string
  options: {
    name: string
    value: string 
  }[] 
}

interface BuilderFormValues {
  title: string
  description: string
  fields: Array<TextInputFormValues | RadioInputFormValues>
}

export function Builder() {
  const [fields, setFields] = useState<JSX.Element[]>([])
  const [editName, toggleEditName] = useState(true)
  const [editDesc, toggleEditDesc] = useState(false)
  const methods = useForm<BuilderFormValues>({defaultValues: {title: "Nome do formulário", description: "Descrição"}})
  const title = methods.getValues("title")
  const description = methods.getValues("description")

  function handleFieldAdd(inputType: string) {
    let currentFields = fields.slice()
    currentFields.push(<FieldBuilder key={currentFields.length} index={currentFields.length} defaultName="Novo input" defaultType={inputType}/>)
    setFields(currentFields)
  }

  return (
    <FormProvider {...methods}>
      <BuilderContainer>
        <BuilderForm>
          <TitleContainer>
            {editName? 
              <TitleInput 
              {...methods.register("title", {required: true})}
              onKeyDown={(e) => e.key === "Enter" && toggleEditName(false)}
              onBlur={() => toggleEditName(false)}
              autoFocus
              />:
              <BuilderTitle>{title}</BuilderTitle>
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
              onBlur={() => toggleEditDesc(false)}
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
