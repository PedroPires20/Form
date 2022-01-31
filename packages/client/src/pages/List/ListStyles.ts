import styled from "styled-components"

export const ListPageContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 70vw;
    max-width: 600px;
    max-height: calc(100vh - 100px);
    margin: 40px auto 0;
    padding: 20px;
    border-radius: 5px;
    box-shadow: #00000099 0px 8px 12px 0px;
    background-color: var(--primary);
`
export const FormListContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: calc(100% - 10px);
    height: calc(100vh - 120px);
    padding: 10px 0;
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
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    overflow: auto;
    margin: 0;
    padding: 0 10px;
    list-style-type: none;
`

export const FormContainer =  styled.li`
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
