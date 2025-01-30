import React from "react";
import "./styles.css";

export default function CheckBox(props) {
  return (
    <div
      className={`class-checkbox no-focus-and-active ${props.isChecked ? "checkbox-active" : ""}`}
      onClick={() => {
        props.setIsChecked(!props.isChecked);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16px"
        height="16px"
        className="checkmark"
      >
        <path
          fill="none"
          stroke="white"
          strokeWidth="2"
          d="M6 12l4 4 8-8"
          className="checkmark-path"
        />
      </svg>
    </div>
  );
}
