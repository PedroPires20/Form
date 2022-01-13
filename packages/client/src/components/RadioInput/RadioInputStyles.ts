import styled from "styled-components";

export const RadioContainer = styled.div` 
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 0.5rem;
`

export const RadioSelector = styled.input` 
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid var(--primary);
    border-radius: 50%;
    margin: 0;
    position: relative;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: "";
        display: block;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        margin: 0;
        box-shadow: inset 1rem 1rem var(--secondary);
        transform: scale(0);
        transition: 300ms transform ease-in-out;
    }

    &:checked::before {
        transform: scale(1);
    }
`

export const RadioLabel = styled.label` 
    color: var(--dark-gray);
    font-size: 14px;
`
