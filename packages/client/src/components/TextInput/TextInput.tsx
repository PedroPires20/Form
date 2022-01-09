import { Input, Label, TextInputContainer } from "./TextInputStyles"
import { UseFormRegister } from "react-hook-form"

type Props = {
  name: string
  placeholder: string
  label: string
  required: boolean
  disabled?: boolean
  register: UseFormRegister<any>
}

export function TextInput({
  name,
  placeholder,
  label,
  disabled = false,
  required,
  register,
}: Props) {
  return (
    <TextInputContainer>
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, { required })}
      />
    </TextInputContainer>
  )
}
