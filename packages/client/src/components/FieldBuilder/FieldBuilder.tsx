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
import { useAppDispatch, useAppSelector } from "../../redux/store"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { TextAreaInput } from "../TextAreaInput/TextAreaInput"
import { hasOptions } from "../../shared/functions/hasOptions"
import OptionsBuilder from "../OptionsBuilder/OptionsBuilder"
import { fieldChanged } from "../../redux/modules/fields/slice"

type Props = {
  field: Field
}

export function FieldBuilder({ field }: Props) {
  const [editing, setEditing] = useState({ label: false, description: false })
  const [hasDescription, setHasDescription] = useState(
    !(field.description === null)
  )
  const [fieldData, setFieldData] = useState({
    label: field.label,
    description:
      field.description === null ? "Insira uma descrição" : field.description,
  })
  const options = useAppSelector((state) =>
    Object.keys(state.options.byId)
      .map((key) => state.options.byId[key])
      .filter((option) => option.fieldId === field.id)
      .sort((a, b) => a.order - b.order)
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fieldChanged({
        ...field,
        label: fieldData.label,
        description: hasDescription ? fieldData.description : "",
      })
    )
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
            initActive={hasDescription}
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
          fieldId={field.id}
          fieldType={field.type}
          options={options}
        />
      )}
    </FieldBuilderContainer>
  )
}
