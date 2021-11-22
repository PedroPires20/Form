import React from "react"
import styled from "styled-components"

export const FieldBuilderContainer = styled.div`
`

export const FieldBuilderHeader = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    padding-right: 0.3rem;
    margin-bottom: 0.5rem;
`

export const NameContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 50%;
    margin-right: 0.8rem;
`

export const NameDisplay = styled.p`
    margin: 0;
    color: var(--dark-gray);
    font-weight: bold;
    font-size: 20px;
`

export const TransparentInput = styled.input`

`

export const EditButton = styled.button`
    display: none;
    background-color: transparent;
    border: none;
    cursor: pointer;

    ${NameContainer}:hover & {
        display: block;
    }
`

