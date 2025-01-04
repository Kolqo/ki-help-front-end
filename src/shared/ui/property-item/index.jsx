import React from "react";
import "./styles.css";

export default function PropertyItem(props) {
  return (
    <>
      <div className={`class-property-item ${props.className || ""}`}>
        {props.icon}
        <p>{props.propertyName}</p>
        {props.rightComponent}
      </div>
    </>
  );
}