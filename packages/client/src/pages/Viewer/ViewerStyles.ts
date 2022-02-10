import styled from "styled-components"

export const ViewerContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: var(--primary);
  width: 70vw;
  max-width: 600px;
  margin: 40px auto 0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: #00000099 0px 8px 12px 0px;
`

export const FormContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  align-self: center;
  width: calc(100% - 40px);
  height: 100%;
  box-shadow: #00000063 0 0 4px 0px;
  border-radius: 5px;
  padding: 10px 20px;
  background: var(--light);
`

export const FormHeader = styled.h1`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: var(--secondary-dark);
  margin: 0.5em 0;
`

export const FormDescription = styled.p`
  font-size: 16px;
  color: var(--dark-gray);
`

export const FormLabel = styled.label`
  color: var(--dark-gray);
  font-weight: bold;
`

export const FieldDescription = styled.p`
  color: var(--dark-gray);
  margin: 0;
  font-size: 14px;
  margin-bottom: 0.5em;
`

export const OptionElementContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 0.8rem;
`

export const ViewerForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 1rem;
  width: 100%;
  margin-top: 0.8rem;
`

export const ViewerButtons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-self: center;
  width: 100%;

  button {
    cursor: pointer;
    font-size: 16px;
    padding: 0.6em 0.4em;
    border-radius: 5px;
    border: none;
    background-color: var(--secondary);
    color: var(--light);
    font-weight: 600;
  }

  button:hover {
    filter: brightness(120%);
  }

  & button:active {
    filter: brightness(80%);
  }
`
