import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function OptionalItem(props) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`style-optional-item ${props.className || ""}`}
        onClick={() =>
          navigate(props.optionalItem.to, {
            state: { task: props.task },
          })
        }
      >
        {props.optionalItem.leftIcon}
        <p>{props.optionalItem.text}</p>
        {props.optionalItem.rightComponent}
      </div>
    </>
  );
}
