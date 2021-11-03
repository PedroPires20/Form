import styled from "styled-components";

export const CheckboxContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
`

export const CheckboxSelector = styled.input`
    appearance: none;
    background-color: #fff;
    margin: 0;
    margin-right: 0.5rem;
    display: inline-block;
    box-sizing: border-box;
    width: 1rem;
    height: 1rem;
    border: 1.5px solid #807e79;
    border-radius: 25%;
    transition: 200ms background-color ease-in-out;
    
    &::before {
        content: "\\2713";
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #fff;
        border-radius: 28%;
        transform: scale(0);
        transition: 200ms transform ease-in-out;
    }
    &:checked::before {
        transform: scale(1);
    }
    &:checked {
        background-color: #2279d6;
    }
`

export const CheckboxLabel = styled.label`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
`
