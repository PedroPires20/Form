import { ChangeEvent, SyntheticEvent, useState } from "react"
import { FieldTypes } from "../../redux/modules/fields/types"
import {
  InputTypeButton,
  InputTypeContainer,
  InputTypeSelect,
} from "./InputTypeStyle"
import { setTestTarget } from "../../shared/functions/setTestTarget"

type Props = {
  onChange: (inputType: FieldTypes) => void
}

export function InputType({ onChange }: Props) {
  const [active, setActive] = useState(false)

  function handleButtonClick(e: SyntheticEvent) {
    e.preventDefault()

    setActive((prev) => !prev)
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value as FieldTypes)
    setActive(false)
  }

  return (
    <InputTypeContainer>
      <InputTypeButton onClick={handleButtonClick} {...setTestTarget("form-input-add")}>
        {active ? "Fechar" : "Adicionar campo"}
      </InputTypeButton>
      {active && (
        <InputTypeSelect onChange={handleSelectChange}  {...setTestTarget("form-input-types")}>
          <option value="">Selecione um tipo de input</option>
          <option value="text">Texto</option>
          <option value="textarea">Área de Texto</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
        </InputTypeSelect>
      )}
    </InputTypeContainer>
  )
}
