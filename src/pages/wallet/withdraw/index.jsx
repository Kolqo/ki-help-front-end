import React from "react";
import "./styles.css";

import { Button, ErrorMessage } from "../../../shared/ui";
import Fields from "./ui/fields";

import useGoBack from "../../../shared/model/useGoBack.js";
import useClickWithdraw from "./model/useClickWithdraw.js";

import fieldsForWithdraw from "./const/fieldsForWithdraw.js";


export default function Withdraw() {
  useGoBack(`/wallet`);

  const { error, handleFieldChange, handleValidation } =
  useClickWithdraw(fieldsForWithdraw);

  return (
    <>
      <div className="container-withdraw">
        <ErrorMessage isError={error}>Ваш баланс менше 100 UAH</ErrorMessage>
        <Fields onChange={handleFieldChange} fields={fieldsForWithdraw}/>
        <Button className="blue-button fixed-button" onClick={handleValidation}>Зняти</Button>
      </div>
    </>
  );
}
