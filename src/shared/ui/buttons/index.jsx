import React from "react";
import "./styles.css";

export default function Button(props) {
  return (
    <>
      <button className={`class-button no-select ${props.className || ""}`} onClick={props.onClick}>
        <div>{props.leftIcon}</div>
        {props.children}
        <div>{props.rightIcon}</div>
      </button>
    </>
  );
}