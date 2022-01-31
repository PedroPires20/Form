import React from "react"
import {
    ListPageContainer,
    FormListContainer,
    FormListHeader,
    FormList,
    FormContainer,
    FromTitle,
    FromButtonsContainer
} from "./ListStyles"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import type { Form } from "../../redux/modules/forms/types"

export function List() {
    const formList: Form[] = [{
        id: '1',
        title: "Form 1",
        description: 'Este é o formulário 1'
    }];

    function FormListItem({ title }: { title: string }) {
        return (
        <FormContainer>
            <FromTitle>{title}</FromTitle>
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
                formList.map((form) => <FormListItem key={form.id} title={form.title}/>)
            }
            </FormList>
        </FormListContainer>
    </ListPageContainer>
    )
}
