import styled from "styled-components"

export const TextInput = styled.textarea`
    height: 4.5em;
    resize: none;
    border: 2px solid var(--primary);
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 10px;
    font-family: inherit;

    &:focus {
        border-color: var(--secondary);
        outline: none;
    }
`
