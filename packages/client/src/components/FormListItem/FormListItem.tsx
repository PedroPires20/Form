import React from "react"
import {
    FormListItemContainer,
    FormInfoContainer,
    FromTitle,
    FormDescription,
    FromButtonsContainer
} from "./FormListItemStyles"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import type { Form } from "../../redux/modules/forms/types"

export function FormListItem({ id, title, description }: Form) {
    return (
    <FormListItemContainer>
        <FormInfoContainer>
            <FromTitle>{title}</FromTitle>
            <FormDescription>{description}</FormDescription>
        </FormInfoContainer>
        <FromButtonsContainer>
            <ActionButton
            icon="pencil" 
            tooltip="Editar form" 
            onClick={() => {}}
            />
            <ActionButton
            icon="bars" 
            tooltip="Visualizar resultados"
            color="var(--primary)"
            onClick={() => {}}
            />
            <ActionButton
            icon="xmark"
            tooltip="Apagar formulário"
            color="var(--error)"
            onClick={() => {}}
            />
        </FromButtonsContainer>
    </FormListItemContainer>
    )
}
