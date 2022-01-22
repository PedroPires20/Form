import { useEffect, useState } from "react"
import {
  Actions,
  Description,
  DescriptionContainer,
  DescriptionDisplay,
  DescriptionEdit,
  FieldBuilderContainer,
  Label,
  LabelDisplay,
  LabelEdit,
} from "./FieldBuilderStyles"
import { TextInput } from "../TextInput/TextInput"
import { Field } from "../../redux/modules/fields/types"
import { useAppDispatch } from "../../redux/store"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { TextAreaInput } from "../TextAreaInput/TextAreaInput"
import { hasOptions } from "../../shared/functions/hasOptions"
import OptionsBuilder from "../OptionsBuilder/OptionsBuilder"

type Props = {
  field: Field
}

export function FieldBuilder({ field }: Props) {
  const [editing, setEditing] = useState({ label: false, description: false })
  const [hasDescription, setHasDescription] = useState(false)
  const [fieldData, setFieldData] = useState({
    label: field.label,
    description: field.description,
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("dispatch field change")
    dispatch(() => {})
  }, [fieldData])

  return (
    <FieldBuilderContainer>
      <Label>
        <Actions>
          <ActionButton
            tooltip="Editar campo"
            icon="pencil"
            onClick={() =>
              setEditing((prev) => ({ ...prev, label: !prev.label }))
            }
          />
          <ActionButton
            tooltip="Subir campo"
            icon="arrowup"
            onClick={() =>
              setEditing((prev) => ({ ...prev, label: !prev.label }))
            }
          />
          <ActionButton
            tooltip="Descer campo"
            icon="arrowdown"
            onClick={() =>
              setEditing((prev) => ({ ...prev, label: !prev.label }))
            }
          />
          <ActionButton
            tooltip={
              hasDescription ? "Remover descrição" : "Adicionar descrição"
            }
            icon="bars"
            onClick={() => setHasDescription((prev) => !prev)}
          />
          <ActionButton
            color="var(--error)"
            icon="xmark"
            onClick={() => {}}
            tooltip="Deletar opção"
          />
        </Actions>
        {editing.label ? (
          <LabelEdit
            autoFocus={true}
            value={fieldData.label}
            onChange={(e) =>
              setFieldData((prev) => ({ ...prev, label: e.target.value }))
            }
          />
        ) : (
          <LabelDisplay>{fieldData.label}</LabelDisplay>
        )}
      </Label>
      <DescriptionContainer>
        {hasDescription && (
          <Description>
            {editing.description ? (
              <DescriptionEdit
                autoFocus={true}
                value={fieldData.description}
                onChange={(e) =>
                  setFieldData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            ) : (
              <DescriptionDisplay>{fieldData.description}</DescriptionDisplay>
            )}
            <ActionButton
              tooltip="Editar descrição"
              icon="pencil"
              onClick={() =>
                setEditing((prev) => ({
                  ...prev,
                  description: !prev.description,
                }))
              }
            />
          </Description>
        )}
      </DescriptionContainer>
      {field.type === "text" && <TextInput />}
      {field.type === "textarea" && <TextAreaInput />}
      {hasOptions(field.type) && (
        <OptionsBuilder
          fieldType={field.type}
          options={[
            {
              id: "53b54af7-5551-4ea2-8672-1759064ba4f6",
              fieldId: field.id,
              name: "option 1",
              value: "true",
              order: 0,
            },
            {
              id: "c3320f12-3390-4e74-8613-551f41bdcbb3",
              fieldId: field.id,
              name: "option 2",
              value: "false",
              order: 1,
            },
          ]}
        />
      )}
    </FieldBuilderContainer>
  )
}
