import styled, { css } from "styled-components"

export const SideNavContainer = styled.div`
  position: fixed;
  left: 0;
`

export const OpenBtn = styled.button<{ active: boolean }>`
  ${({ active }) => css`
    outline: none;
    border: none;
    background: var(--primary);
    border-radius: 0 5px 5px 0;
    padding: 5px 10px;
    cursor: pointer;
    box-shadow: #000000b5 3px 5px 5px 0px;
    svg {
      color: var(--light);
      width: 15px;
      transition: 0.3s;
      transform: ${active ? "rotateZ(180deg)" : "rotateZ(0)"};
    }
  `}
`

export const LinksContainer = styled.div<{ active: boolean }>`
  ${({ active }) => css`
    width: 150px;
    border-radius: 0 5px 5px 0;
  padding: 10px 0;
    background: var(--primary);
    transform: ${active ? "translateX(0)" : "translateX(-150px)"};
    transition: .5s;
    box-shadow: #000000b5 3px 5px 5px 0px;

    display: flex;
    flex-flow: column;
    justify-content: center;

    a {
      outline: none;
      text-decoration: none;
      color: var(--light);
      text-align: center;
      font-weight: bold;
      margin: 10px 0;
    }
  `}
`
