import styled from "styled-components"

export const LoginContainer = styled.div`
    display: flex;
    width: 70vw;
    max-width: 600px;
    flex-flow: column;
    align-items: center;
    margin: 25vh auto 0;
    padding: 20px;
    border-radius: 5px;
    box-shadow: #00000099 0px 8px 12px 0px;
    background-color: var(--primary);
`
export const LoginFormContainer = styled.div`
    width: calc(100% - 40px);
    padding: 10px 20px;
    background-color: var(--light);
    box-shadow: #00000063 0 0 4px 0px;
    border-radius: 5px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`

export const LoginHeaderL = styled.h1`
    text-align: center;
    font-size: 40px;
    color: var(--secondary-dark);
    margin: 1rem 0 1.5rem 0;
`

export const LoginHeaderSm = styled.h2`
    text-align: center;
    font-size: 22px;
    color: var(--secondary-dark);
    margin: 0;
    margin-bottom: 2rem;
`

export const LoginForm = styled.form`
    display: flex;
    flex-flow: column nowrap;
    row-gap: 1.2rem;
    width: 70%;

    & label {
        font-size: 16px;
        color: var(--dark-gray);
        font-weight: 600;
    }

    & input {
        border: none;
        outline: none;
        background-color: transparent;
        border-bottom: 2px solid var(--primary);
        padding-bottom: 0.2em;
        font-size: 18px;
        color: var(--dark);
        margin-bottom: 0.5em;
    }

    & input:focus {
        border-color: var(--secondary);
    }

    & button {
        align-self: center;
        padding: 0.5rem 1rem;
        font-family: inherit;
        font-size: 16px;
        font-weight: bold;
        color: var(--light);
        background-color: var(--secondary-dark);
        border: none;
        border-radius: 5px;
    }

    & button:hover {
        background-color: var(--secondary);
    }

    & button:active {
        filter: brightness(80%);
    }
`

export const LoginLinks = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    row-gap: 1rem;
    margin: 1.5rem 0;

    & a {
        font-size: 14px;
        font-weight: bold;
        text-decoration: none;
        color: var(--dark-gray);
    }

    & a:hover {
        color: var(--secondary-dark);
    }
`

export const LoginFormError = styled.p`
    align-self: flex-end;
    margin: 0;
    font-size: 16px;
    color: #cf1313;
`
