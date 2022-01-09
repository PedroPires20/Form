import styled from "styled-components"

export const TextInputContainer = styled.div`
  display: flex;
  flex-flow: column;
`

export const Label = styled.label`
  color: var(--dark-gray);
  margin-bottom: 5px;
  font-weight: bold;
`

export const Input = styled.input`
  border: 2px solid var(--primary);
  border-radius: 5px;
  font-size: 16px;
  padding: 5px 10px;
`
