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

export function List() {
    const formList = ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 1", "Form 2", "Form 3", "Form 4", "Form 5"]

    function FormListItem({ formName }: { formName: string }) {
        return (
        <FormContainer>
            <FromTitle>{formName}</FromTitle>
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
                formList.map((name, index) => <FormListItem key={index} formName={name}/>)
            }
            </FormList>
        </FormListContainer>
    </ListPageContainer>
    )
}
