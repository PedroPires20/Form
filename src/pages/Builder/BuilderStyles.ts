import styled from "styled-components";
import editPencil from "./assets/pencil-fill.svg"

export const BuilderContainer = styled.div`
  background: var(--primary);
  width: 70vw;
  max-width: 600px;
  margin: 40px auto 0;
  padding: 20px;

  border-radius: 5px;
  box-shadow: #00000099 0px 8px 12px 0px;

  display: flex;
  flex-flow: column;
  align-items: center;
`

export const BuilderForm = styled.form`
  background: var(--light);
  width: calc(100% - 40px);
  height: 100%;
  box-shadow: #00000063 0 0 4px 0px;

  border-radius: 5px;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 10px 20px;
`

export const TitleContainer = styled.div` 
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin-bottom: 20px;
  column-gap: 0.6rem;
  width: 100%;
`

export const BuilderTitle = styled.div`
  color: var(--dark-gray);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  margin-bottom: 20px;
  column-gap: 0.6rem;
  width: 100%;
`

export const BuilderDescription = styled.div`
  color: var(--dark-gray);
  font-size: 16px;
  font-weight: bold;
`

export const BuilderFields = styled.div`
  width: 100%;
`

export const BuilderSubmit = styled.button`
  background: var(--secondary);
  font-weight: bold;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  padding: 5px 10px;
  color: var(--light);
`

const EditButton = styled.button`
  font-size: inherit;
  background-image: url(${editPencil});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  border: none;
  outline: none;
  background-color: transparent;
  width: 1em;
  height: auto;
  padding: 0;
  visibility: hidden;
`

export const EditTitle = styled(EditButton)`
  ${TitleContainer}:hover & {
    visibility: visible;
  }
`

export const EditDescription = styled(EditButton)`
  ${DescriptionContainer}:hover & {
    visibility: visible;
  }
`

export const TransparentInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 2px solid var(--primary);
  padding-bottom: 0.2em;

  &:focus {
    border-color: var(--secondary);
  }
`

export const NameInput = styled(TransparentInput)`
  color: var(--dark-gray);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`

export const DescriptionInput = styled(TransparentInput)`
  color: var(--dark-gray);
  font-size: 16px;
  font-weight: bold;
  flex: 1;
`
