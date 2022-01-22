import React from "react"
import {
  FormContainer,
  FormHeader,
  FormDescription,
  FormLabel,
  FieldDescription,
  OptionElementContainer,
  ViewerContainer,
  ViewerForm,
  ViewerButtons,
} from "./ViewerStyles"
import { TextInput } from "./../../components/TextInput/TextInput"
import { CheckboxInput } from "./../../components/CheckboxInput/CheckboxInput"

interface TextInputFormValues {
  type: "text"
  name: string
  label: string
  description?: string
  placeholder: string
}

interface RadioInputFormValues {
  type: "radio"
  name: string
  label: string
  description?: string
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

export function Viewer() {
  const formData: BuilderFormValues = {
    title: "Primeiro formulário",
    description: "Este é o primeiro formulário do Form, criado para testes.",
    fields: [
      {
        type: "text",
        name: "test",
        label: "Este é um campo de texto",
        placeholder: "Entre um texto aqui",
      },
      {
        type: "radio",
        name: "options",
        label: "Este é um campo de opções checkbox",
        description: "Descrição do campo aqui",
        options: [
          {
            name: "Opção 1",
            value: "1",
          },
          {
            name: "Opção 2",
            value: "2",
          },
          {
            name: "Opção 3",
            value: "3",
          },
          {
            name: "Opção 4",
            value: "4",
          },
          {
            name: "Opção 5",
            value: "5",
          },
        ],
      },
    ],
  }

  return (
    <ViewerContainer>
      <FormContainer>
        <FormHeader>{formData.title}</FormHeader>
        <FormDescription>{formData.description}</FormDescription>
        <ViewerForm>
          {formData.fields.map((fieldData, index) => {
            switch (fieldData.type) {
              case "text":
                return (
                  <>
                    <FormLabel>{fieldData.label}</FormLabel>
                    {fieldData.description && (
                      <FieldDescription>
                        {fieldData.description}
                      </FieldDescription>
                    )}
                    <TextInput
                      key={index}
                      placeholder={fieldData.placeholder}
                      onChange={() => {}}
                    />
                  </>
                )
              case "radio":
                return (
                  <OptionElementContainer key={index}>
                    <FormLabel>{fieldData.label}</FormLabel>
                    {fieldData.description && (
                      <FieldDescription>
                        {fieldData.description}
                      </FieldDescription>
                    )}
                    {fieldData.options.map((optionData, index) => (
                      <CheckboxInput
                        key={index}
                        name={optionData.name}
                        value={optionData.value}
                      />
                    ))}
                  </OptionElementContainer>
                )
            }
          })}
          <ViewerButtons>
            <button type="reset">Redefinir</button>
            <button type="submit">Enviar respostas</button>
          </ViewerButtons>
        </ViewerForm>
      </FormContainer>
    </ViewerContainer>
  )
}
