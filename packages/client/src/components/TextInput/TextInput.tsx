import { Input } from "./TextInputStyles"
import { UseFormRegister } from "react-hook-form"

type Props = {
  name: string
  placeholder: string
  required?: boolean
  disabled?: boolean
  register: UseFormRegister<any>
}

export function TextInput({
  name,
  placeholder,
  disabled = false,
  required,
  register,
}: Props) {
  return (
    <Input
      placeholder={placeholder}
      disabled={disabled}
      {...register(name, { required })}
    />
  )
}
