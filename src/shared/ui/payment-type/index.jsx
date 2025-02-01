import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import { ArrowGrayIcon } from "../../assets/svg"

export default function PaymentType(props) {
  return (
    <>
      <Link to={props.to} className={`class-payment-type no-underline ${props.className || ""}`}>
        {props.icon}
        <p>{props.paymentName}</p>
        <ArrowGrayIcon/>
      </Link>
    </>
  );
}