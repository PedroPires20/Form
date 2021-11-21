import { useForm } from "react-hook-form"
import { TextInput } from "../../components/TextInput/TextInput"
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
