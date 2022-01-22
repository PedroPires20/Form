import styled, { css } from "styled-components"

export const ActionButtonContainer = styled.div<{
  active: boolean
  color: string
}>`
  ${({ active, color }) => css`
    cursor: pointer;
    height: min-content;
    width: min-content;
    background: ${active ? "var(--primary)" : color};
    border-right: 1px solid var(--light);
    border-radius: 5px;
    padding: 2px 5px;
    svg {
      width: 10px;
      color: var(--light);
    }
  `}
`
