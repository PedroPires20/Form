import styled from "styled-components"

export const FormListItemContainer =  styled.li`
    display: flex;
    flex-flow: row nowrap;
    padding: 10px;
    align-items: center;
`

export const FormInfoContainer = styled.div`
    max-width: 80%;
`

export const FromTitle = styled.h2`
    margin: 0;
    font-size: 18px;
    color: var(--dark-gray);
`

export const FormDescription = styled.p`
    font-size: 16px;
    color: var(--gray);
    margin: 0;
    margin-top: 0.4rem;
`

export const FromButtonsContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    column-gap: 0.7rem;
    margin-left: auto;
`
