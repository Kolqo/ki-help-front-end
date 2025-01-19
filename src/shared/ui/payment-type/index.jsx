import React from "react";
import { ArrowGrayIcon } from "../../assets/svg"
import "./styles.css";

export default function Adder(props) {
  return (
    <>
      <div className={`class-payment-tape ${props.className || ""}`}>
        {props.icon}
        <p>{props.paymentName}</p>
        <ArrowGrayIcon/>
      </div>
    </>
  );
}