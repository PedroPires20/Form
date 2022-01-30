import styled from "styled-components"

export const ListPageContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 70vw;
    max-width: 600px;
    margin: 40px auto 0;
    padding: 20px;
    border-radius: 5px;
    box-shadow: #00000099 0px 8px 12px 0px;
    background-color: var(--primary);
`
export const FormListContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: calc(100% - 40px);
    padding: 10px 20px;
    box-shadow: #00000063 0 0 4px 0px;
    border-radius: 5px;
    background-color: var(--light);
`

export const FormListHeader = styled.h1`
    align-self: center;
    color: var(--dark-gray);
    font-size: 38px;
`

export const FormList = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
`

export const FormContainer =  styled.li`
    border: 1px solid #000;
    display: flex;
    flex-flow: row nowrap;
    padding: 10px;
`

export const FromTitle = styled.h2`
    margin: 0;
`

export const FromButtonsContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    column-gap: 0.7rem;
    margin-left: auto;
`

const FromActionButton = styled.button`

`

export const FormEditButton = styled(FromActionButton)` 

`
export const FormResultsButton = styled(FromActionButton)` 
    
`

export const FromDeleteButton = styled(FromActionButton)` 
    
`
