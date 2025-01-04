import React from "react";
import HryvniaIcon from "../assets/hryvnia-icon";
import "./styles.css";

export default function Transaction(props) {
  return (
    <>
      <div className="class-transaction">
        <HryvniaIcon/>
        <div className="transaction-text">
          <div className="transaction-user-name">{props.userName}</div>
          <div className="transaction-time">{props.transactionTime}</div>
        </div>
        <p>{props.amount} UAH</p>
      </div>
    </>
  );
}