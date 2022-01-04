import React, { useState } from "react"
import {
OptionListContainer,
OptionListHeader,
Options,
OptionContainer,
OptionInput,
OptionEditButton,
OptionDeleteButton,
OptionConfirmButton,
OptionCancelButton,
AddOptionButton
} from "./OptionListStyles"

interface Props {
    optionNames: string[]
    onOptionListChange: (newOptions: string[]) => void
}

export function OptionList({optionNames, onOptionListChange}: Props) {
    const [options, setOptions] = useState(optionNames)
    const [optionEditIndex, setOptionEditIndex] = useState(-1)

    function handleOptionAdd(e: React.MouseEvent) {
        e.preventDefault()
        let newOptions = options.slice()
        newOptions.push(`Opção ${options.length + 1}`)
        setOptions(newOptions)
        onOptionListChange(newOptions)
    }
    
    function handleOptionEditStart(e: React.MouseEvent, optionIndex: number) {
        e.preventDefault()
        const optionInput = e.currentTarget.parentNode?.children[0] as HTMLInputElement
        optionInput.focus()
        setOptionEditIndex(optionIndex)
    }

    function handleOptionEditFinish(
    e: React.KeyboardEvent | React.MouseEvent,
    optionIndex: number, 
    confirmChanges = true
    ) {
        setOptionEditIndex(-1);
        if(confirmChanges) {
            const target = (e.type === "click")? 
                (e.currentTarget.parentElement?.children[0] as HTMLInputElement):
                (e.currentTarget as HTMLInputElement)
            let newOptions = options.slice()
            newOptions[optionIndex] = target.value
            setOptions(newOptions)
            onOptionListChange(newOptions)
        }
    }

    function handleOptionDelete(e: React.MouseEvent, optionIndex: number) {
        e.preventDefault()
        let newOptions = options.filter((value, index) => index != optionIndex)
        setOptions(newOptions)
        onOptionListChange(newOptions)
    }

    return (
    <OptionListContainer>
        <OptionListHeader>Opções:</OptionListHeader>
        <Options>
            {options.map((optionName, optionIndex) => 
            <OptionContainer key={optionIndex}>
                <OptionInput 
                defaultValue={optionName}
                onKeyDown={(e) => (e.key === "Enter") && handleOptionEditFinish(e, optionIndex)}
                disabled={optionIndex !== optionEditIndex}
                />
                {(optionIndex === optionEditIndex)?
                    <>
                        <OptionConfirmButton onClick={(e) => handleOptionEditFinish(e, optionIndex)}/>
                        <OptionCancelButton onClick={(e) => handleOptionEditFinish(e, optionIndex, false)}/>
                    </>:
                    <>
                        <OptionEditButton onClick={(e) => handleOptionEditStart(e, optionIndex)}/>
                        <OptionDeleteButton onClick={(e) => handleOptionDelete(e, optionIndex)}/>
                    </>
                }   
            </OptionContainer>
            )}
        </Options>
        <AddOptionButton onClick={handleOptionAdd}>Adicionar opção</AddOptionButton>
    </OptionListContainer>
    )
}
