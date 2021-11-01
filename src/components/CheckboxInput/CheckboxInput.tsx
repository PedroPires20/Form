import React from "react";
import { CheckboxContainer, CheckboxSelector, CheckboxLabel } from "./CheckboxInputStyles";

export interface CheckboxInputProps {
    inputName: string,
    optionName: string,
}

export function CheckboxInput(props: CheckboxInputProps) {
    return <CheckboxContainer>
        <CheckboxSelector 
        type="checkbox" 
        name={props.inputName} 
        value={props.optionName}
        />
        <CheckboxLabel htmlFor={props.inputName}>{props.optionName}</CheckboxLabel>
    </CheckboxContainer>
}
