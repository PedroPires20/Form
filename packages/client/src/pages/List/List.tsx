import React from "react"
import {
    ListPageContainer,
    FormListContainer,
    FormListHeader,
    FormList,
    FormContainer,
    FromTitle,
    FromButtonsContainer,
    FormEditButton,
    FormResultsButton,
    FromDeleteButton
} from "./ListStyles"

export function List() {
    return (
    <ListPageContainer>
        <FormListContainer>
            <FormListHeader>Meus formulários</FormListHeader>
            <FormList>
                <FormContainer>
                    <FromTitle>Nome do formulário</FromTitle>
                    <FromButtonsContainer>
                        <FormEditButton/>
                        <FormResultsButton/>
                        <FromDeleteButton/>
                    </FromButtonsContainer>
                </FormContainer>
            </FormList>
        </FormListContainer>
    </ListPageContainer>
    )
}
