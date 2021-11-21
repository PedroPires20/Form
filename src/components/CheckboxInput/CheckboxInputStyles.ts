import styled from "styled-components"
import checkMark from "./assets/check-lg.svg";

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
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--primary);
  border-radius: 5px;
  transition: 200ms background-color ease-in-out;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(${checkMark});
    transform: scale(0);
    transition: 300ms transform ease-in-out;
  }

  &:checked::before {
    transform: scale(1);
  }

  &:checked {
    background-color: var(--secondary);
    border-color: var(--gray);
  }
`

export const CheckboxLabel = styled.label`
  color: var(--dark-gray);
  font-size: 14px;
`
