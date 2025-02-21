import React from "react";
import "./styles.css";

import TypeOfDeposit from "./ui/type-of-deposit";

import { useGoBack } from "../../../shared/model";

export default function Deposit() {
  useGoBack(`/wallet`);
  return (
    <>
      <div className="container-deposit">
        <TypeOfDeposit/>
      </div>
    </>
  );
}
