import React from "react";
import "./styles.css";

import { PaymentType } from "../../../../../shared/ui";
import { CreditCard } from "../../assets";

export default function TypeOfDeposit() {
  return (
    <>
      <div className="style-type-of-deposit">
        <PaymentType
          className="payment-type"
          icon={<img src={CreditCard} width={23} height={19} />}
          paymentName="Visa/Mastercard"
        />
      </div>
    </>
  );
}
