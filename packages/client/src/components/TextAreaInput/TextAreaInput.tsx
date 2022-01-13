import React from "react"
import { TextInput } from "./TextAreaInputStyles"
import { UseFormRegister } from "react-hook-form"

interface Props {
    name: string
    placeholder: string
    required?: boolean
    disabled?: boolean
    register: UseFormRegister<any>
}

export function TextAreaInput({
    name,
    placeholder,
    required,
    disabled,
    register
}: Props) {
    return <TextInput 
        placeholder={placeholder}
        {...register(name, { required, disabled })}
    />
}
