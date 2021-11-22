import { useState } from "react"
import {
  SelectContainer,
  SelectHeader,
  SelectArrowContainer,
  SelectArrow,
  SelectOptionList,
  SelectOption,
  SelectedOption,
} from "./SelectInputStyles"
import chevronDown from "./assets/chevron-down.svg";

interface Option {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  id?: string
  name?: string
  defaultText: string
  defaultValue?: string
  options: Option[]
  onChange: (newValue?: string) => void
}

export function SelectInput(props: Props) {
  const [expanded, toggleExpanded] = useState(false)
  const [selectedOption, setSelectedOption] = useState(-1)

  function handleOptionClick(optionIndex: number) {
    setSelectedOption(optionIndex)
    toggleExpanded(false)
    props.onChange(
      optionIndex >= 0 ? props.options[optionIndex].value : props.defaultValue
    )
  }

  return (
    <SelectContainer id={props.id}>
      <SelectHeader onClick={() => toggleExpanded(!expanded)}>
        <SelectOption>
          <SelectedOption>
            {selectedOption < 0
              ? props.defaultText
              : props.options[selectedOption].label}
          </SelectedOption>
        </SelectOption>
        <SelectArrowContainer>
          <SelectArrow src={chevronDown} alt="seletor" isExpanded={expanded}/>
        </SelectArrowContainer>
      </SelectHeader>
      <SelectOptionList isExpanded={expanded}>
        <SelectOption onClick={() => handleOptionClick(-1)}>
          {props.defaultText}
        </SelectOption>
        {props.options.map((option, index) => (
          <SelectOption
            key={index}
            onClick={() => !option?.disabled && handleOptionClick(index)}
            disabled={option.disabled}
          >
            {option.label}
          </SelectOption>
        ))}
      </SelectOptionList>
    </SelectContainer>
  )
}
