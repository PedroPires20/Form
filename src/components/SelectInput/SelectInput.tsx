import React, { useState } from "react";
import { SelectContainer, SelectHeader, SelectArrow, SelectOptionList, SelectOption } from "./SelectInputStyles";

interface Option {
    value: string,
    label: string
}

interface Props {
    id?: string,
    name?: string,
    defaultText: string,
    options: Option[]
}

export function SelectInput(props: Props) {
    const [expanded, toggleExpanded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(-1);

    return <SelectContainer id={props.id}>
        <SelectHeader onClick={() => toggleExpanded(!expanded)}>
            <SelectOption>
                {(selectedOption < 0)? props.defaultText: props.options[selectedOption].label}
            </SelectOption>
            <SelectArrow>&#12337;</SelectArrow>
        </SelectHeader>
        <SelectOptionList isExpanded={expanded}>
            <SelectOption onClick={() => setSelectedOption(-1)}>{props.defaultText}</SelectOption>
            {
                props.options.map((option, index) => 
                    <SelectOption key={index} onClick={() => setSelectedOption(index)}>{option.label}</SelectOption>
                )
            }
        </SelectOptionList>
        <input name={props.name} type="hidden" value={(selectedOption < 0)? "": props.options[selectedOption].value}/>
    </SelectContainer>
}
