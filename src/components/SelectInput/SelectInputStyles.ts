import React from "react";
import styled from "styled-components";

export const SelectContainer = styled.div`
    width: max-content;
    font-family: Arial, Helvetica, sans-serif;
`

export const SelectHeader = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    border: 1px solid #000;
    border-radius: 0.5rem;
    user-select: none;

    & div {
        margin-right: 0.8rem;
        border-bottom: none;
    }
`

export const SelectArrow = styled.span`
    display: inline-block;
    transform: rotate(-90deg);
`

export const SelectOption = styled.div`
    flex-grow: 1;
    flex-shrink: 0;
    font-size: 14px;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid #888;
    user-select: none;
    box-sizing: border-box;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`

interface SelectOptionProps extends React.ComponentPropsWithoutRef<"div"> {
    isExpanded?: boolean
}

export const SelectOptionList = styled.div<SelectOptionProps>`
    display: ${props => props.isExpanded? "flex": "none"};
    flex-flow: column nowrap;
    width: max-content;
    align-items: stretch;
    border: 1px solid #000;
    border-radius: 0.6rem;
    margin-top: 0.8rem;
`
