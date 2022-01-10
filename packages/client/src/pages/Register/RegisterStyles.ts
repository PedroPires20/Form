import styled from "styled-components";

export const RegisterContainer = styled.div`
    display: flex;
    width: 70vw;
    max-width: 600px;
    flex-flow: column;
    align-items: center;
    margin: 40px auto 0;
    padding: 20px;
    border-radius: 5px;
    box-shadow: #00000099 0px 8px 12px 0px;
    background-color: var(--primary);
`

export const RegisterFormContainer = styled.div`
    width: calc(100% - 40px);
    padding: 10px 20px;
    background-color: var(--light);
    box-shadow: #00000063 0 0 4px 0px;
    border-radius: 5px;
`

export const RegisterHeader = styled.h1`
    text-align: center;
    font-size: 36px;
    color: var(--secondary-dark);
    margin: 1rem 0 2rem 0;
`

export const RegisterForm = styled.form`
    display: flex;
    flex-flow: column wrap;
    row-gap: 0.8rem;
`

export const RegisterFormLabel = styled.label`
    font-size: 16px;
    color: var(--dark-gray);
`

export const RegisterFormInput = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 0.2em;
    font-size: 18px;
    color: var(--dark);
    margin-bottom: 0.5em;

    &:focus {
        border-color: var(--secondary);
    }
`

export const RegisterFormError = styled.label`
    align-self: flex-end;
    font-size: 16px;
    color: #cf1313;
`

export const RegisterFormButtons = styled.div`
    display: flex;
    flex-flow: row nowrap;
    column-gap: 1rem;
    align-self: center;
    margin-top: 20px;

    & button {
        padding: 0.6rem 0.5rem;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        color: var(--light);
        background-color: var(--secondary);
    }

    & button:hover {
        filter: brightness(120%);
    }

    & button:active {
        filter: brightness(80%);
    }
`
