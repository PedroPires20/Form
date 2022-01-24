import styled from "styled-components"

export const FieldBuilderContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 10px;
`

export const Actions = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  margin-bottom: 5px;
`

export const Label = styled.div`
  display: flex;
  flex-flow: column;
`

export const LabelDisplay = styled.div`
  margin-bottom: 10px;
  color: var(--dark-gray);
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
`

export const LabelEdit = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid var(--primary);
  font-size: 16px;
  font-weight: bold;
  color: var(--dark-gray);
  margin-bottom: 10px;

  &:focus {
    border-width: 0 0 2px 0;
    outline: none;
  }
`

export const AddDescription = styled.button`
  width: 150px;
  background: var(--secondary);
  font-weight: bold;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px 10px;
  color: var(--light);
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 10px;
`

export const Description = styled.div`
  display: flex;
  flex-flow: row;
  margin-bottom: 5px;
`

export const DescriptionEdit = styled.textarea`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid var(--primary);
  font-size: 12px;
  font-weight: bold;
  color: var(--dark-gray);
  margin-bottom: 10px;
  min-width: 95%;

  &:focus {
    border-width: 0 0 2px 0;
    outline: none;
  }
`

export const DescriptionDisplay = styled.div`
  margin-bottom: 10px;
  color: var(--dark-gray);
  font-weight: bold;
  font-size: 12px;
  margin-right: 10px;
`

export const EditIcon = styled.img`
  width: 18px;
  margin-left: 10px;
  cursor: pointer;
`
