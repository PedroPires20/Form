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
  label: string
  disabled?: boolean
}

interface Props {
  selectorText: string
  unselectedValue?: string
  options: Option[]
  disabled?: boolean
  onChange?: (newValue?: string) => void
  value?: string
}

export function SelectInput({
  selectorText,
  unselectedValue,
  options,
  disabled,
  onChange,
  value,
}: Props) {
  const [expanded, toggleExpanded] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(indexFromValue(value))

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
            {selectedIndex < 0 ? selectorText : options[selectedIndex].label}
          </SelectedOption>
        </SelectOption>
        <SelectArrowContainer>
          <SelectArrow src={chevronDown} alt="seletor" isExpanded={expanded} />
        </SelectArrowContainer>
      </SelectHeader>
      <SelectOptionList isExpanded={expanded}>
        <SelectOption onClick={() => handleOptionClick(-1)}>
          {selectorText}
        </SelectOption>
        {options.map((option, index) => (
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
