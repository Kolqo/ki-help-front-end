import React from "react";
import "./styles.css";

export default function HorizontalWrapper(props) {
  return (
    <div className="horizontal-wrapper">
      <div className="scroll-container">
        {props.children}
      </div>
    </div>
  );
}