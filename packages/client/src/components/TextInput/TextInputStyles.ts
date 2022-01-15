import styled from "styled-components"

export const Input = styled.input`
  border: 2px solid var(--primary);
  border-radius: 5px;
  font-size: 16px;
  padding: 5px 10px;

  &:focus {
    outline: none;
    border-color: var(--secondary);
  }
`
