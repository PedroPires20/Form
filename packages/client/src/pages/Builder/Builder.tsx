import { SyntheticEvent, useEffect, useState } from "react"
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
import { changeCurrentForm, saveForm } from "../../redux/modules/forms/thunks"
import {
  clearForm,
  currentFormChanged,
  descriptionChanged,
  titleChanged,
} from "../../redux/modules/forms/slice"
import { useHistory, useParams } from "react-router-dom"
import { setTestTarget } from "../../shared/functions/setTestTarget"

type Props = {
  type: "create" | "edit"
}

export function Builder({ type }: Props) {
  const [editing, setEditing] = useState({ title: false, desc: false })
  const allForms = useAppSelector((state) => state.form.all)
  const title = useAppSelector((state) => state.form.title)
  const description = useAppSelector((state) => state.form.description)
  const loading = useAppSelector((state) => state.form.loading)
  const { id } = useParams<{ id: string }>()
  const fields = useAppSelector((state) =>
    Object.keys(state.fields.byId)
      .map((key) => state.fields.byId[key])
      .filter((field) =>
        type === "edit" ? field.formId === id : field.formId === null
      )
      .sort((a, b) => a.order - b.order)
  )
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    if (id && type === "edit") {
      dispatch(changeCurrentForm(id))
    } else {
      dispatch(clearForm())
    }
  }, [id])

  useEffect(() => {
    type === "edit" && dispatch(currentFormChanged({ id }))
  }, [allForms])

  function handleFieldAdd(inputType: FieldTypes) {
    dispatch(
      fieldAdded({
        id: v4(),
        type: inputType,
        label: null,
        description: null,
        formId: id || null,
      })
    )
  }

  function renderField(field: Field) {
    return <FieldBuilder key={field.id} field={field} />
  }

  return (
    <BuilderContainer
      className="builder-container"
    >
      <BuilderForm {...setTestTarget("form:creation-form")}>
        <TitleContainer {...setTestTarget("form-title")}>
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
        <DescriptionContainer {...setTestTarget("form-description")}>
          {editing.desc ? (
            <DescriptionInput
              defaultValue={description ?? "Insira a descrição do form"}
              autoFocus
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
        <BuilderFields {...setTestTarget("builder-fields")}>{fields.map(renderField)}</BuilderFields>
        <InputType onChange={handleFieldAdd} />
        <BuilderSubmit
          disabled={loading}
          onClick={(e) => {
            e.preventDefault()
            dispatch(
              saveForm(type, () => {
                history.push("/")
              })
            )
          }}
          {...setTestTarget("builder-save")}
        >
          Salvar
        </BuilderSubmit>
      </BuilderForm>
    </BuilderContainer>
  )
}
