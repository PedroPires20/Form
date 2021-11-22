import React from "react"
import styled from "styled-components"

export const SelectContainer = styled.div`
  display: block;
  flex-flow: column nowrap;
  position: relative;
  width: 100%;
  margin: 20px 0;
`

interface SelectHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  disabled?: boolean
}

export const SelectHeader = styled.div<SelectHeaderProps>`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  border: 2px solid var(--primary);
  border-radius: 5px;
  user-select: none;
  background-color: ${props => (props.disabled)? "#ebebeb": "#fff"};
  color: ${props => (props.disabled)? "var(--gray)": "var(--dark-gray)"};

  & div {
    margin-right: 0.8rem;
    border-bottom: none;
  }

  & div:hover {
    background-color: transparent;
  }
`

export const SelectArrowContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`

interface SelectArrowProps extends React.ComponentPropsWithoutRef<"img"> {
  isExpanded?: boolean
}

export const SelectArrow = styled.img<SelectArrowProps>`
  width: 1rem;
  height: auto;
  transform: rotate(${(props) => (props.isExpanded ? "180" : "0")}deg);
  transition: all 200ms ease-in-out;
`

interface SelectOptionProps extends React.ComponentPropsWithoutRef<"div"> {
  disabled?: boolean
}

export const SelectOption = styled.div<SelectOptionProps>`
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 14px;
  padding: 7px 10px;
  border-bottom: 1px solid var(--gray);
  user-select: none;
  box-sizing: border-box;
  color: ${(props) => (props?.disabled ? "var(--gray)" : "var(--dark-gray)")};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const SelectedOption = styled.span`
  display: inline-block;
`

interface SelectOptionListProps extends React.ComponentPropsWithoutRef<"div"> {
  isExpanded?: boolean
}

export const SelectOptionList = styled.div<SelectOptionListProps>`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  width: 100%;
  border: 2px solid var(--primary);
  border-radius: 5px;
  margin-top: 0.4rem;
  position: absolute;
  z-index: 100;
  background-color: #fff;
  transform-origin: top center;
  transform: scaleY(${(props) => (props.isExpanded ? "1" : "0")});
  transition: all 250ms ease-in-out;
`
