import React from "react";
import "./styles.css";

export default function Button(props) {
  return (
    <>
      <button className={`class-button no-select ${props.className || ""}`} onClick={props.onClick}>
        {props.leftIcon}
        {props.children}
        {props.rightIcon}
      </button>
    </>
  );
}