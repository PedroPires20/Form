import React from "react"
import {
    ListPageContainer,
    FormListContainer,
    FormListHeader,
    FormList,
    FormContainer,
    FormInfoContainer,
    FromTitle,
    FormDescription,
    FromButtonsContainer
} from "./ListStyles"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import type { Form } from "../../redux/modules/forms/types"

export function List() {
    const formList: Form[] = [...Array(10).keys()].map((i) => {
        return {
            id: `${i}`,
            title: `Form ${i + 1}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        }
    })
    function FormListItem({ id, title, description }: Form) {
        return (
        <FormContainer>
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
        </FormContainer>
        )
    }

    return (
    <ListPageContainer>
        <FormListContainer>
            <FormListHeader>Meus formulários</FormListHeader>
            <FormList>                
            {
                formList.map((form) => <FormListItem 
                key={form.id}
                id={form.id} 
                title={form.title}
                description={form.description}
                />
            )}
            </FormList>
        </FormListContainer>
    </ListPageContainer>
    )
}
