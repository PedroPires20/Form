import styled from "styled-components";


export const InputTypeContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-flow: column;
  position: relative;
  width: 100%;
  align-items: center;
  
`

export const InputTypeButton = styled.button`
  cursor: pointer;
  background: var(--primary);
  padding: 5px 10px;
  color: var(--light);
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  width: 50%;
`

export const InputTypeSelect = styled.select`
  width: 50%;
  position: absolute;
  bottom: -20px;
  user-select: none;

  border: 2px solid var(--primary);
  font-size: 16px;
  border-radius: 0 0 5px 5px;
  outline: none;
`
