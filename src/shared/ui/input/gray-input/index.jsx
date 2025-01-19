import React, { forwardRef } from "react";
import { LoupeGrayIcon } from "../../../assets/svg";
import "./styles.css";

export default function GrayInput(props) {
  return (
    <>
      <div className="gray-input-wrapper">
        <input
          className="class-gray-input"
          placeholder=" "
        />
        <div className="gray-input-ph">
          <LoupeGrayIcon />
          <p>Пошук</p>
        </div>
      </div>
    </>
  );
}
