import React from "react"
import styled from "styled-components"
import editIcon from "./assets/pencil-fill.svg"
import deleteIcon from "./assets/trash-fill.svg"
import confirmIcon from "./assets/check-lg.svg"
import cancelIcon from "./assets/x-lg.svg"
import addIcon from "./assets/plus.svg"

export const OptionListContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-self: flex-start;
    justify-content: space-evenly;
    width: max-content;
    height: 15rem;
    align-self: center;
`

export const OptionListHeader = styled.p`
    margin: 0;
    font-size: 18px;
    padding-left: 0.8rem;
    color: var(--dark-gray);
    font-weight: bold;
`

export const OptionContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    justify-content: space-evenly;
    width: 100%;
    margin-right: 1.8rem;
`

export const OptionInput = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 16px;
    color: var(--dark);

    &:focus {
        border-bottom: 2px solid var(--secondary-dark);
    }

    &:enabled {
        border-bottom: 1px solid var(--gray);
    }
`

const OptionButton = styled.button`
    width: 1.1rem;
    height: 1.1rem;
    border: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    visibility: hidden;

    &:hover {
        filter: brightness(120%);
    }

    &:active {
        filter: brightness(80%);
    }

    ${OptionContainer}:hover & {
        visibility: visible;
    }
`

export const OptionEditButton = styled(OptionButton)`
    background-image: url(${editIcon});
`

export const OptionDeleteButton = styled(OptionButton)`
    background-image: url(${deleteIcon});
    margin-right: 0.5rem;
`

export const OptionConfirmButton = styled(OptionButton)`
    background-image: url(${confirmIcon});
`

export const OptionCancelButton = styled(OptionButton)`
    background-image: url(${cancelIcon});
    margin-right: 0.5rem;
`

export const AddOptionButton = styled.button`
    width: 10rem;
    padding: 0.5rem 0 0.5rem 0.8rem;
    background-color: var(--primary);
    background-image: url(${addIcon});
    background-repeat: no-repeat;
    background-size: 1.5rem auto;
    background-position: 5% 50%;
    color: var(--light);
    border: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    margin: 0 auto;
`
