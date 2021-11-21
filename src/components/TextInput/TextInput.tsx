import React from "react";

interface Props {
  entrada: string;
}

export default (props: Props) => {
  const ContainerStyle = {
    display: "block",
    fontFamily: "Arial",
  };
  return (
    <React.Fragment>
      <div>
        <label htmlFor="text">{props.entrada}</label>
        <input style={ContainerStyle} type="text" name="texto"></input>
      </div>
    </React.Fragment>
  );
};
