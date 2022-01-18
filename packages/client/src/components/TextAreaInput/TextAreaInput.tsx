import { TextInput } from "./TextAreaInputStyles"

interface Props {
    placeholder?: string
    disabled?: boolean
}

export function TextAreaInput({
    placeholder,
    disabled,
}: Props) {
    return <TextInput 
        placeholder={placeholder}
    />
}
