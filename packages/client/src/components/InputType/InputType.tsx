import { ChangeEvent, SyntheticEvent, useState } from "react"
import {
  InputTypeButton,
  InputTypeContainer,
  InputTypeSelect,
} from "./InputTypeStyle"

type Props = {
  onChange: (inputType: string) => void
}

export function InputType({ onChange }: Props) {
  const [active, setActive] = useState(false)

  function handleButtonClick(e: SyntheticEvent) {
    e.preventDefault()

    setActive((prev) => !prev)
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value)
    setActive(false)
  }

  return (
    <InputTypeContainer>
      <InputTypeButton onClick={handleButtonClick}>
        {active ? "Fechar" : "Adicionar campo"}
      </InputTypeButton>
      {active && (
        <InputTypeSelect onChange={handleSelectChange}>
          <option value="">Selecione um tipo de input</option>
          <option value="text">Texto</option>
          <option value="textarea">Área de Texto</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="select">Select</option>
        </InputTypeSelect>
      )}
    </InputTypeContainer>
  )
}
