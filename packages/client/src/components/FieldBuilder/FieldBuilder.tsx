import { useState } from "react"
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
import {
  fieldChanged,
  fieldDeleted,
  fieldOrderChanged,
} from "../../redux/modules/fields/slice"
import { optionDeleted } from "../../redux/modules/options/slice"
import { setTestTarget } from "../../shared/functions/setTestTarget"

type Props = {
  field: Field
}

export function FieldBuilder({ field }: Props) {
  const [editing, setEditing] = useState({ label: false, description: false })
  const [hasDescription, setHasDescription] = useState(
    !(field.description === null)
  )
  const options = useAppSelector((state) =>
    Object.keys(state.options.byId)
      .map((key) => state.options.byId[key])
      .filter((option) => option.fieldId === field.id)
      .sort((a, b) => a.order - b.order)
  )
  const dispatch = useAppDispatch()

  function deleteField() {
    options.forEach((option) => dispatch(optionDeleted(option)))
    dispatch(fieldDeleted(field))
  }

  return (
    <FieldBuilderContainer>
      <Label {...setTestTarget("BF-label-container")}>
        <Actions {...setTestTarget("builder-field-actions")}>
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
            onClick={() => dispatch(fieldOrderChanged({ field, delta: -1 }))}
          />
          <ActionButton
            tooltip="Descer campo"
            icon="arrowdown"
            onClick={() => dispatch(fieldOrderChanged({ field, delta: 1 }))}
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
            onClick={deleteField}
            tooltip="Deletar campo"
          />
        </Actions>
        {editing.label ? (
          <LabelEdit
            autoFocus={true}
            value={field.label ?? "Insira o nome do campo"}
            onChange={(e) => {
              dispatch(
                fieldChanged({
                  ...field,
                  label: e.target.value,
                })
              )
            }}
          />
        ) : (
          <LabelDisplay {...setTestTarget("builder-field-label")}>{field.label ?? "Insira o nome do campo"}</LabelDisplay>
        )}
      </Label>
      <DescriptionContainer {...setTestTarget("BF-desc-container")}>
        {hasDescription && (
          <Description>
            {editing.description ? (
              <DescriptionEdit
                autoFocus={true}
                value={field.description ?? "Insira uma descrição"}
                onChange={(e) => {
                  dispatch(
                    fieldChanged({
                      ...field,
                      description: e.target.value,
                    })
                  )
                }}
              />
            ) : (
              <DescriptionDisplay>
                {field.description ?? "Insira uma descrição"}
              </DescriptionDisplay>
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
