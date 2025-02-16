import React, { useState } from "react";
import "./styles.css";

import { Button, ErrorMessage } from "../../../shared/ui";
import Fields from "./ui/fields";

import { useErrorMessage } from "../../../shared/model";

import fieldsForWithdraw from "./const/fieldsForWithdraw.js";


export default function Withdraw() {
  const { error, setError } = useErrorMessage();

  const [values, setValues] = useState(
    new Array(fieldsForWithdraw.length).fill("")
  );

  const handleFieldChange = (index, value) => {
    setValues(prev => {
      const newValues = [...prev];
      newValues[index] = value.target.value;
      return newValues;
    });
  };

  const isMore100 = () => {
    const amount = Number(values[1]);
    
    if (!values[1] || isNaN(amount) || amount < 100) {
      setError(true);
    } else {
      setError(false);
    }
  }

  return (
    <>
      <div className="container-withdraw">
        <ErrorMessage isError={error}>Ваш баланс менше 100 UAH</ErrorMessage>
        <Fields onChange={handleFieldChange} />
        <div className="withdraw-button-box">
          <Button className="blue-button withdraw-button" onClick={isMore100}>Зняти</Button>
        </div>
      </div>
    </>
  );
}
