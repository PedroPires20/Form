import { useForm } from "react-hook-form"
import {InputType} from "../../components/InputType/InputType"
import { SelectInput } from "../../components/SelectInput/SelectInput"
import {
  BuilderContainer,
  BuilderDescription,
  BuilderForm,
  BuilderSubmit,
  BuilderTitle,
  BuilderFields,
  SelectLabel
} from "./BuilderStyles"

export function Builder() {
  const { register, getValues } = useForm()

  return (
    <BuilderContainer>
      <BuilderForm>
        <BuilderTitle>Title</BuilderTitle>
        <BuilderDescription>Description</BuilderDescription>

        <BuilderFields>
          <SelectLabel>Campo de teste:</SelectLabel>
          <SelectInput placeholder="Selecione uma opção" options={[{name: "Opção 1", value: "1"}, {name: "Opção 2", value: "2"}, {name: "Opção 3", value: "3"}]}/>
        </BuilderFields>
        <InputType onChange={() => {}}/>
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
