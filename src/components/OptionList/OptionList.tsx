import React from "react"
import {
OptionListContainer,
OptionListHeader,
OptionContainer,
OptionInput,
OptionEditButton,
OptionDeleteButton,
AddOptionButton
} from "./OptionListStyles"

export function OptionList() {
    return (
    <OptionListContainer>
        <OptionListHeader>Opções:</OptionListHeader>
        <OptionContainer>
            <OptionInput value="Opção 1"/>
            <OptionEditButton/>
            <OptionDeleteButton/>
        </OptionContainer>
        <OptionContainer>
            <OptionInput value="Opção 2"/>
            <OptionEditButton/>
            <OptionDeleteButton/>
        </OptionContainer>
        <OptionContainer>
            <OptionInput value="Opção 3"/>
            <OptionEditButton/>
            <OptionDeleteButton/>
        </OptionContainer>
        <AddOptionButton>Adicionar opção</AddOptionButton>
    </OptionListContainer>
    )
}
