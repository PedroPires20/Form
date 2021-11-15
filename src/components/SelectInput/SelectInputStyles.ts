import React from "react";
import styled from "styled-components";

export const SelectContainer = styled.div`
    width: max-content;
    font-family: Arial, Helvetica, sans-serif;
    position: relative;
`

export const SelectHeader = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: fit-content;
    border: 1px solid #000;
    border-radius: 0.5rem;
    user-select: none;

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

interface SelectArrowProps extends React.ComponentPropsWithoutRef<"span"> {
    isExpanded?: boolean
}

export const SelectArrow = styled.span<SelectArrowProps>`
    display: inline-block;
    width: fit-content;
    height: fit-content;
    transform: rotate(${props => props.isExpanded? "90": "-90"}deg);
    transition: all 200ms ease-in-out;
`

interface SelectOptionProps extends React.ComponentPropsWithoutRef<"div"> {
    disabled?: boolean
}

export const SelectOption = styled.div<SelectOptionProps>`
    flex-grow: 1;
    flex-shrink: 0;
    font-size: 14px;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid #888;
    user-select: none;
    box-sizing: border-box;
    color: ${props => props?.disabled? "#aaa": "#000"};

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

interface SelectOptionListProps extends React.ComponentPropsWithoutRef<"div"> {
    isExpanded?: boolean
}

export const SelectOptionList = styled.div<SelectOptionListProps>`
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    width: 100%;
    border: 1px solid #000;
    border-radius: 0.6rem;
    margin-top: 0.6rem;
    position: absolute;
    z-index: 100;
    background-color: #fff;
    transform-origin: top center;
    transform: scaleY(${props => props.isExpanded? "1": "0"});
    transition: all 250ms ease-in-out;
`
