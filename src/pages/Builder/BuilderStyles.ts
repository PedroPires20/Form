import styled from "styled-components";

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

export const BuilderTitle = styled.div`
  color: var(--dark-gray);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`

export const BuilderDescription = styled.div`
  color: var(--dark-gray);
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
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
