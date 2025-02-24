import React, { forwardRef } from "react";
import { LoupeGrayIcon } from "../../../assets/svg";
import "./styles.css";

export default function GrayInput(props) {
  return (
    <>
      <div className={`gray-input-wrapper ${props.className || ""}`}>
        <input
          className="class-gray-input"
          placeholder=" "
          onChange={(e) => props.onChange(e.target.value)} 
        />
        <div className="gray-input-ph">
          <LoupeGrayIcon />
          <p>{props.placeholder}</p>
        </div>
      </div>
    </>
  );
}
