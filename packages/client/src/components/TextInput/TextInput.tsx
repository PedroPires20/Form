import { Input } from "./TextInputStyles"
import { ChangeEventHandler } from "react"

type Props = {
  value?: string
  placeholder?: string
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function TextInput({
  placeholder,
  disabled = false,
  value,
  onChange,
}: Props) {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  )
}
