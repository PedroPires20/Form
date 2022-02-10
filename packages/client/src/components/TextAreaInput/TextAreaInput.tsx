import { TextInput } from "./TextAreaInputStyles"

type Props =  {
  onChange?: (value: string) => void
}

export function TextAreaInput({ onChange }: Props) {
  return <TextInput onChange={e => onChange && onChange(e.target.value)} />
}
