import { useState, useEffect } from "react"
import {
  SelectContainer,
  SelectHeader,
  SelectArrowContainer,
  SelectArrow,
  SelectOptionList,
  SelectOption,
  SelectedOption,
} from "./SelectInputStyles"
import chevronDown from "./assets/chevron-down.svg"

interface Option {
  value: string
  name: string
  disabled?: boolean
}

interface Props {
  placeholder: string
  unselectedValue?: string
  options: Option[]
  disabled?: boolean
  onChange?: (newValue?: string) => void
  value?: string
}

function indexFromValue(options: Option[], optionValue?: string) {
  const valueIndex = optionValue && options.map(option => option.value).indexOf(optionValue)
  return (typeof valueIndex === "number")? valueIndex: -1;
}

export function SelectInput({
  placeholder,
  unselectedValue,
  options,
  disabled,
  onChange,
  value,
}: Props) {
  const [expanded, toggleExpanded] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(indexFromValue(options, value))

  function handleOptionClick(optionIndex: number) {
    setSelectedIndex(optionIndex)
    toggleExpanded(false)
    onChange &&
      onChange(optionIndex >= 0 ? options[optionIndex].value : unselectedValue)
  }

  function indexFromValue(optionValue: string | undefined) {
    const valueIndex =
      optionValue && options.map((option) => option.value).indexOf(optionValue)
    return typeof valueIndex === "number" ? valueIndex : -1
  }

  useEffect(() => setSelectedIndex(indexFromValue(value)), [value])

  return (
    <SelectContainer>
      <SelectHeader
        onClick={() => !disabled && toggleExpanded(!expanded)}
        disabled={disabled}
      >
        <SelectOption>
          <SelectedOption>
            {selectedIndex < 0 ? placeholder : options[selectedIndex].name}
          </SelectedOption>
        </SelectOption>
        <SelectArrowContainer>
          <SelectArrow src={chevronDown} alt="seletor" isExpanded={expanded} />
        </SelectArrowContainer>
      </SelectHeader>
      <SelectOptionList isExpanded={expanded}>
        <SelectOption onClick={() => handleOptionClick(-1)}>
          {placeholder}
        </SelectOption>
        {options.map((option, index) => (
          <SelectOption
            key={index}
            onClick={() => !option?.disabled && handleOptionClick(index)}
            disabled={option.disabled}
          >
            {option.name}
          </SelectOption>
        ))}
      </SelectOptionList>
    </SelectContainer>
  )
}
