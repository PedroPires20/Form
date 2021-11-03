import React from "react";
import { CheckboxContainer, CheckboxSelector, CheckboxLabel } from "./CheckboxInputStyles";

interface Props {
    name: string,
    value: string,
}

export function CheckboxInput(props: Props) {
    return <CheckboxContainer>
        <CheckboxSelector 
        type="checkbox" 
        name={props.name} 
        value={props.value}
        />
        <CheckboxLabel htmlFor={props.name}>{props.value}</CheckboxLabel>
    </CheckboxContainer>
}
