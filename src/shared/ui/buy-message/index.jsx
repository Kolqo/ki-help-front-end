import React from "react";
import "./styles.css";

export default function TextMessage(props) {
  return (
    <>
      <div className="message-area">
        <div>{props.icon}</div>
        {props.children}
      </div>
    </>
  );
}