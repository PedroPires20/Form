import styled from "styled-components"

export const OptionBuilderContainer = styled.div``

export const OptionEdit = styled.div`
  display: flex;
  flex-flow: row;
  margin-bottom: 5px;
`

export const OptionItem = styled.div`
  display: flex;
  flex-flow: row wrap;
`

export const AddOption = styled.button`
  margin-bottom: 5px;
  background: var(--primary);
  font-weight: bold;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: var(--light);
`

export const Actions = styled.div`
  display: flex;
  flex-flow: row;
  margin-left: 10px;
`
