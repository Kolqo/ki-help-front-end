import React from "react";
import "./styles.css";

import TypeOfDeposit from "./ui/type-of-deposit";
import { ErrorMessage } from "../../../shared/ui";

import { useGoBack } from "../../../shared/model";

import { useBankJar } from "../../wallet/deposit/model/useBankJar";

export default function Deposit() {
  useGoBack(`/wallet`);

  const {error, errorMessage, handleChooseJar} = useBankJar();

  return (
    <>
      <div className="container-deposit">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="deposit">
          <TypeOfDeposit onClick={() => handleChooseJar()} />
        </div>
        <p>Мінімальна сума поповнення 10 UAH.</p>
      </div>
    </>
  );
}
