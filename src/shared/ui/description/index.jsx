import React from "react";
import "./styles.css";

export default function Description(props) {
  return (
    <div className={`class-description${props.className || ""}`}>
      {props.children}
    </div>
  );
}