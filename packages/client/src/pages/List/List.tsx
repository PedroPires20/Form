import React from "react"
import {
    ListPageContainer,
    FormListContainer,
    FormListHeader,
    FormList
} from "./ListStyles"
import { FormListItem } from "../../components/FormListItem/FormListItem"
import type { Form } from "../../redux/modules/forms/types"

export function List() {
    const formList: Form[] = [...Array(10).keys()].map((i) => {
        return {
            id: `${i}`,
            title: `Form ${i + 1}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        }
    })

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
