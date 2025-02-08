import React from "react";
import "./styles.css";

import HryvniaIcon from "../assets/hryvnia-icon";
import { TimeFormatter } from "../../../shared/ui"

export default function Transaction(props) {
  const isDeposit = props.transaction.transactionType === "DEPOSIT";
  return (
    <>
      <div className="class-transaction">
        <HryvniaIcon />
        <div className="transaction-text">
          <div className="transaction-user-name">
            {props.transaction.initials}
          </div>
          <div className="transaction-time"><TimeFormatter utcDateString={props.transaction.createdAt}/></div>
        </div>
        <p
          className={isDeposit ? "transaction-deposit" : "transaction-withdraw"}
        >
          {isDeposit ? "+" : "-"} {props.transaction.amount} UAH
        </p>
      </div>
    </>
  );
}
