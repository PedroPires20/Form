import React from "react"
import { RadioContainer, RadioSelector, RadioLabel } from "./RadioInputStyles"
import { UseFormRegister } from "react-hook-form"

interface Props {
    name: string
    value: string
    required?: boolean
    disabled?: boolean
    register: UseFormRegister<any>
}

export function RadioInput({
    name,
    value,
    required,
    disabled,
    register
}: Props) {
    return (
    <RadioContainer>
        <RadioSelector 
            type="radio" 
            value={value}
            {...register(name, { required: required, disabled: disabled})}
        />
        <RadioLabel>{value}</RadioLabel>
    </RadioContainer>
    )
}
