import React from "react";
import "./styles.css";

export default function PropertyItem(props) {
  return (
    <>
      <div className={`class-property-item ${props.className || ""}`} onClick={props.onClick} >
        <p>{props.propertyItem.propertyName}</p>
        <div className="right-component">
          {props.propertyItem.rightComponent}
        </div>
      </div>
    </>
  );
}