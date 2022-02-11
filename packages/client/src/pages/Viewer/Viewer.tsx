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
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useHistory, useParams } from "react-router-dom"
import { Field } from "../../redux/modules/fields/types"
import { RadioInput } from "../../components/RadioInput/RadioInput"
import { MouseEvent, useEffect, useState } from "react"
import { changeCurrentForm } from "../../redux/modules/forms/thunks"
import { TextAreaInput } from "../../components/TextAreaInput/TextAreaInput"
import { currentFormChanged } from "../../redux/modules/forms/slice"
import { FieldOption } from "../../redux/modules/options/types"
import { sendAnswer } from "../../redux/modules/results/thunks"

function OptionsViewer({
  options,
  type,
  onChange,
}: {
  options: FieldOption[]
  type: string
  onChange: (options: string[]) => void
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  useEffect(() => {
    onChange(selectedOptions)
  }, [selectedOptions])

  return (
    <>
      {options.map((option) => {
        const checked = selectedOptions.includes(option.id)

        switch (type) {
          case "checkbox":
            return (
              <CheckboxInput
                key={option.id}
                name={option.name}
                value={checked}
                onChange={(value) =>
                  value
                    ? setSelectedOptions((prev) => [...prev, option.id])
                    : setSelectedOptions((prev) =>
                        prev.filter((optId) => optId !== option.id)
                      )
                }
              />
            )
          case "radio":
            return (
              <RadioInput
                key={option.id}
                name={option.name}
                value={checked}
                onChange={() => setSelectedOptions([option.id])}
              />
            )
          default:
            return <></>
        }
      })}
    </>
  )
}

function FieldViewer({
  field,
  onChange,
}: {
  field: Field
  onChange: (value: { value?: string; options?: string[] }) => void
}) {
  const options = useAppSelector((state) =>
    Object.keys(state.options.byId)
      .map((key) => state.options.byId[key])
      .filter((option) => option.fieldId === field.id)
      .sort((a, b) => a.order - b.order)
  )
  switch (field.type) {
    case "text":
      return (
        <>
          <FormLabel>{field.label}</FormLabel>
          {field.description && (
            <FieldDescription>{field.description}</FieldDescription>
          )}
          <TextInput
            onChange={(e) => {
              onChange({ value: e.target.value })
            }}
          />
        </>
      )
    case "textarea":
      return (
        <>
          <FormLabel>{field.label}</FormLabel>
          {field.description && (
            <FieldDescription>{field.description}</FieldDescription>
          )}
          <TextAreaInput
            onChange={(value) => {
              onChange({ value })
            }}
          />
        </>
      )
    case "checkbox":
      return (
        <OptionElementContainer>
          <FormLabel>{field.label}</FormLabel>
          {field.description && (
            <FieldDescription>{field.description}</FieldDescription>
          )}
          {
            <OptionsViewer
              options={options}
              type={field.type}
              onChange={(options) => onChange({ options })}
            />
          }
        </OptionElementContainer>
      )
    case "radio":
      return (
        <OptionElementContainer>
          <FormLabel>{field.label}</FormLabel>
          {field.description && (
            <FieldDescription>{field.description}</FieldDescription>
          )}
          <OptionsViewer
            options={options}
            type={field.type}
            onChange={(options) => onChange({ options })}
          />
        </OptionElementContainer>
      )
    default:
      return <></>
  }
}

export function Viewer() {
  const { id } = useParams<{ id: string }>()
  const form = useAppSelector((state) => state.form)
  const fields = useAppSelector((state) =>
    Object.keys(state.fields.byId)
      .map((key) => state.fields.byId[key])
      .filter((field) => field.formId === id)
      .sort((a, b) => a.order - b.order)
  )
  const loading = useAppSelector(state => state.results.loading)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [answers, setAnswers] = useState<
    Record<string, { value?: string; options?: string[] }>
  >({})

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    dispatch(sendAnswer(answers, () => {
      history.push("/")
    }))
  }

  useEffect(() => {
    dispatch(currentFormChanged({ id }))
  }, [form.all])

  useEffect(() => {
    dispatch(changeCurrentForm(id))
  }, [])

  useEffect(() => {
    // console.log(answers)
  }, [answers])

  return (
    <ViewerContainer>
      <FormContainer>
        <FormHeader>{form.title}</FormHeader>
        {form.description && (
          <FormDescription>{form.description}</FormDescription>
        )}
        <ViewerForm>
          {fields.map((field) => (
            <FieldViewer
              key={field.id}
              field={field}
              onChange={(value) =>
                setAnswers((prev) => ({ ...prev, [field.id]: value }))
              }
            />
          ))}
          <ViewerButtons>
            <button type="button" disabled={loading} onClick={handleSubmit}>
              Enviar respostas
            </button>
          </ViewerButtons>
        </ViewerForm>
      </FormContainer>
    </ViewerContainer>
  )
}
