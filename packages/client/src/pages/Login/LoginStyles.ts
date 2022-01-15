import styled from "styled-components"

export const LoginContainer = styled.div`
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
    margin: 1rem 0 2rem 0;
`

export const LoginHeaderSm = styled.h2`
    text-align: center;
    font-size: 20px;
    color: var(--secondary-dark);
    margin: 1rem 0 2rem 0;
`

export const LoginForm = styled.form`
    display: flex;
    flex-flow: column nowrap;
    row-gap: 0.8rem;
    width: 70%;

    & label {

    }

    & input {

    }
`

export const LoginLinks = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    row-gap: 0.8rem;
    padding: 1rem;

    & a {

    }
`
