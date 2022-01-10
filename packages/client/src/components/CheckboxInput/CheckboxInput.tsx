import {
  CheckboxContainer,
  CheckboxSelector,
  CheckboxLabel,
} from "./CheckboxInputStyles";
import { UseFormRegister } from "react-hook-form";


interface Props {
  name: string,
  value: string,
  required?: boolean,
  disabled?: boolean,
  register: UseFormRegister<any>
}

export function CheckboxInput({
  name,
  value,
  required,
  disabled,
  register
}: Props) {
  return (
    <CheckboxContainer>
      <CheckboxSelector
        type="checkbox"
        value={value}
        disabled={disabled}
        {...register(name, { required: required })}
      />
      <CheckboxLabel htmlFor={value}>{name}</CheckboxLabel>
    </CheckboxContainer>
  )
}
