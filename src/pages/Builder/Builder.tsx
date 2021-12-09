import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { InputType } from "../../components/InputType/InputType"
import { TextInput } from "../../components/TextInput/TextInput"
import { getExample } from "../../redux/modules/example/thunks"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import {
  BuilderContainer,
  BuilderDescription,
  BuilderForm,
  BuilderSubmit,
  BuilderTitle,
  BuilderFields,
} from "./BuilderStyles"

export function Builder() {
  const { register, getValues } = useForm()
  const example = useAppSelector((state) => state.example.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getExample())
  }, [])

  useEffect(() => {
    console.log(example)
  }, [example])

  return (
    <BuilderContainer>
      <BuilderForm>
        <BuilderTitle>Title</BuilderTitle>
        <BuilderDescription>Description</BuilderDescription>

        <BuilderFields>
          <TextInput
            register={register}
            name="test"
            label="Campo de teste"
            required
            placeholder="Insira alguma coisa"
          />
        </BuilderFields>
        <InputType onChange={() => {}} />
        <BuilderSubmit
          onClick={(e) => {
            e.preventDefault()
            console.log(getValues())
          }}
        >
          Clique me!
        </BuilderSubmit>
      </BuilderForm>
    </BuilderContainer>
  )
}
