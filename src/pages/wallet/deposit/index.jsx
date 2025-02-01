import React from "react";
import "./styles.css";

import TypeOfDeposit from "./ui/type-of-deposit";

export default function Deposit() {
  return (
    <>
      <div className="container-deposit">
        <TypeOfDeposit/>
      </div>
    </>
  );
}
