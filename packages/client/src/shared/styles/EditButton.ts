import styled from "styled-components"
import editPencil from "../assets/pencil-fill.svg"

export const EditButton = styled.button`
  font-size: inherit;
  background-image: url(${editPencil});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  border: none;
  outline: none;
  background-color: transparent;
  width: 16px;
  padding: 0;
  cursor: pointer;
`
