import React from "react";
import "./styles.css";

import { ArrowGrayIcon } from "../../assets/svg";

export default function PaymentType(props) {
  return (
    <>
      <div
        className={`class-payment-type no-underline ${props.className || ""}`}
        onClick={props.onClick}
      >
        {props.icon}
        <p>{props.paymentName}</p>
        <ArrowGrayIcon />
      </div>
    </>
  );
}
