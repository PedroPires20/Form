import { SyntheticEvent, useState } from "react"
import { InputType } from "../../components/InputType/InputType"
import {
  BuilderContainer,
  DescriptionContainer,
  BuilderDescription,
  BuilderForm,
  BuilderSubmit,
  TitleContainer,
  BuilderTitle,
  BuilderFields,
  TitleInput,
  DescriptionInput,
} from "./BuilderStyles"
import { FieldBuilder } from "../../components/FieldBuilder/FieldBuilder"
import { Field } from "../../redux/modules/fields/types"
import { v4 } from "uuid"
import ActionButton from "../../shared/components/ActionButton/ActionButton"

export function Builder() {
  const [fields, setFields] = useState<Field[]>([])
  const [editing, setEditing] = useState({ title: false, desc: false })
  const [formData, setFormData] = useState({
    title: "Insira o título do form",
    description: "Insira a descrição do form",
  })

  function handleFieldAdd(inputType: string) {
    setFields((prev) => [
      ...prev,
      {
        id: v4(),
        type: inputType,
        label: "Insira o nome do campo",
        description: "Insira uma descrição",
        options: [],
      } as Field,
    ])
  }

  function handleClickOutside(e: SyntheticEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement
    if (target.classList.contains("builder-container")) {
      setEditing({ title: false, desc: false })
    }
  }

  function renderField(field: Field) {
    return <FieldBuilder key={field.id} field={field} />
  }

  return (
    <BuilderContainer
      className="builder-container"
      onClick={handleClickOutside}
    >
      <BuilderForm>
        <TitleContainer>
          {editing.title ? (
            <TitleInput
              defaultValue={formData.title}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                setEditing((prev) => ({ ...prev, title: false }))
              }
              onBlur={() => setEditing((prev) => ({ ...prev, title: false }))}
              autoFocus
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          ) : (
            <BuilderTitle>{formData.title}</BuilderTitle>
          )}
          <ActionButton
            icon="pencil"
            onClick={() => {
              setEditing((prev) => ({ ...prev, title: !prev.title }))
            }}
          />
        </TitleContainer>
        <DescriptionContainer>
          {editing.desc ? (
            <DescriptionInput
              defaultValue={formData.description}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                setEditing((prev) => ({ ...prev, desc: false }))
              }
              onBlur={() => setEditing((prev) => ({ ...prev, desc: false }))}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          ) : (
            <BuilderDescription>{formData.description}</BuilderDescription>
          )}
          <ActionButton
            icon="pencil"
            onClick={() => {
              setEditing((prev) => ({ ...prev, desc: !prev.desc }))
            }}
          />
        </DescriptionContainer>
        <BuilderFields>{fields.map(renderField)}</BuilderFields>
        <InputType onChange={handleFieldAdd} />
        <BuilderSubmit
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          Salvar
        </BuilderSubmit>
      </BuilderForm>
    </BuilderContainer>
  )
}
