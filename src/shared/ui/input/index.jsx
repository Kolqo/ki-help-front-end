import React from "react";
import "./styles.css";

export default function Input(props) {
  return (
    <>
      <input
        className={`class-input${props.className || ""}`}
        placeholder={props.placeholder}
      >
        
      </input>
    </>
  );
}
