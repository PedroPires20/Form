import styled, {css} from "styled-components"

export const ActionButtonContainer = styled.div<{active: boolean}>`
  cursor: pointer;
  height: min-content;
  width: min-content;
  ${({active}) => css`background: ${active ? "var(--primary);" : "var(--secondary);"}`}
  border-right: 1px solid var(--light);
  border-radius: 5px;
  padding: 2px 5px;
  svg {
    width: 10px;
    color: var(--light);
  }
`
