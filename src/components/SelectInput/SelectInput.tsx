import React, { useState, useEffect } from "react";
import { SelectContainer, SelectHeader, SelectArrowContainer, SelectArrow, SelectOptionList, SelectOption } from "./SelectInputStyles";

interface Option {
    value: string,
    label: string,
    disabled?: boolean
}

interface Props {
    id?: string,
    name?: string,
    defaultText: string,
    defaultValue?: string,
    options: Option[],
    onChange: (newValue?: string) => void
}

export function SelectInput(props: Props) {
    const [expanded, toggleExpanded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(-1);
    const [maxOptionWidth, setMaxOptionWidth] = useState(0);

    function handleOptionClick(optionIndex: number) {
        setSelectedOption(optionIndex);
        toggleExpanded(false);
        props.onChange((optionIndex >= 0)? props.options[optionIndex].value: props.defaultValue)
    }

    useEffect(() => {
        let maxLabelLength = props.defaultText.length;
        for(const option of props.options)
            if(option.label.length > maxLabelLength)
                maxLabelLength = option.label.length;
        // Calculating the width of the option with the largest label
        let text = document.createElement("span");
        text.innerHTML = "a".repeat(maxLabelLength);
        // These style definitions are needed to calculate the text width
        text.style.visibility = 'hidden';
        text.style.height = 'auto';
        text.style.width = 'auto';
        text.style.position = 'absolute';
        text.style.whiteSpace = 'no-wrap';
        // These style definitions should match the styles of the "SelectOption" element
        text.style.fontFamily = 'Arial, Helvetica, sans-serif';
        text.style.fontSize = '14px';
        // Calculating the text size
        document.body.appendChild(text);
        setMaxOptionWidth(text.clientWidth);
        document.body.removeChild(text);
    }, [props.options, props.defaultText]);

    return <SelectContainer id={props.id}>
        <SelectHeader onClick={() => toggleExpanded(!expanded)}>
            <SelectOption>
                <span style={{display: "inline-block", minWidth: `${maxOptionWidth}px`}}>
                    {(selectedOption < 0)? props.defaultText: props.options[selectedOption].label}
                </span>
            </SelectOption>
            <SelectArrowContainer>
                <SelectArrow isExpanded={expanded}>&#12337;</SelectArrow>
            </SelectArrowContainer>
        </SelectHeader>
        <SelectOptionList isExpanded={expanded}>
            <SelectOption onClick={() => handleOptionClick(-1)}>{props.defaultText}</SelectOption>
            {
                props.options.map((option, index) => 
                    <SelectOption
                    key={index} 
                    onClick={() => (!option?.disabled) && handleOptionClick(index)}
                    disabled={option.disabled}
                    >
                        {option.label}
                    </SelectOption>
                )
            }
        </SelectOptionList>
        <input name={props.name} type="hidden" value={(selectedOption < 0)? "": props.options[selectedOption].value}/>
    </SelectContainer>
}
