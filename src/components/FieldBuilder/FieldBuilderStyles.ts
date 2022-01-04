import React from "react"
import styled from "styled-components"

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
    margin-right: 0.8rem;
`

export const NameDisplay = styled.p`
    margin: 0;
    color: var(--dark-gray);
    font-weight: bold;
    font-size: 20px;
`

export const NameEdit = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--primary);
    font-size: 20px;
    font-weight: bold;
    color: var(--dark-gray);

    &:focus {
        border-width: 0 0 2px 0;
        outline: none;
    }
`

export const EditButton = styled.button`
    display: block;
    background-color: transparent;
    border: none;
    cursor: pointer;
    visibility: hidden;

    ${NameContainer}:hover & {
        visibility: visible;
    }
`
