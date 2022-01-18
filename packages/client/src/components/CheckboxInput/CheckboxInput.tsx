import {
  CheckboxContainer,
  CheckboxSelector,
  CheckboxLabel,
} from "./CheckboxInputStyles";


interface Props {
  name: string,
  value: string,
  disabled?: boolean,
}

export function CheckboxInput({
  name,
  value,
  disabled,
}: Props) {
  return (
    <CheckboxContainer>
      <CheckboxSelector
        type="checkbox"
        value={value}
        disabled={disabled}
      />
      <CheckboxLabel htmlFor={value}>{name}</CheckboxLabel>
    </CheckboxContainer>
  )
}
