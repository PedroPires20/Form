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
import { Field, FieldTypes } from "../../redux/modules/fields/types"
import { v4 } from "uuid"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { fieldAdded } from "../../redux/modules/fields/slice"
import { saveForm } from "../../redux/modules/forms/thunks"
import {
  descriptionChanged,
  titleChanged,
} from "../../redux/modules/forms/slice"

export function Builder() {
  const [editing, setEditing] = useState({ title: false, desc: false })
  const [formData, setFormData] = useState({
    title: "Insira o título do form",
    description: "Insira a descrição do form",
  })
  const title = useAppSelector((state) => state.form.title)
  const description = useAppSelector((state) => state.form.description)
  const fields = useAppSelector((state) =>
    Object.keys(state.fields.byId)
      .map((key) => state.fields.byId[key])
      .sort((a, b) => a.order - b.order)
  )
  const dispatch = useAppDispatch()

  function handleFieldAdd(inputType: FieldTypes) {
    dispatch(
      fieldAdded({
        id: v4(),
        type: inputType,
        label: "Insira o nome do campo",
        description: null,
      })
    )
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
              defaultValue={title ?? "Insira o título do form"}
              autoFocus
              onChange={(e) => dispatch(titleChanged(e.target.value))}
            />
          ) : (
            <BuilderTitle>{title ?? "Insira o título do form"}</BuilderTitle>
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
              defaultValue={description ?? "Insira a descrição do form"}
              onChange={(e) => dispatch(descriptionChanged(e.target.value))}
            />
          ) : (
            <BuilderDescription>
              {description ?? "Insira a descrição do form"}
            </BuilderDescription>
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
            dispatch(saveForm("create"))
          }}
        >
          Salvar
        </BuilderSubmit>
      </BuilderForm>
    </BuilderContainer>
  )
}
