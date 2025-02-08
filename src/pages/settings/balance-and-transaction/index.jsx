import React, { useState } from "react";
import "./styles.css";

import { ActionSwitch } from "../../../shared/ui";
import { DevBalance, ListTransaction, UserBalance, PopupDeposit } from "./ui";
import useToggle from "../../../shared/model/useToggle";

export default function BalanceAndTransaction() {
  const [isDev] = useState(true);
  const { state, toggle } = useToggle(true);
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <div className="container-balance-and-transaction">
        {isPopupOpen && <PopupDeposit onClick={() => setPopupOpen(false)}/>}
        {isDev && (
          <ActionSwitch
            leftText="Загальний"
            rightText="Dev"
            isSwitch={state}
            setIsSwitch={toggle}
          />
        )}
        {isDev ? (
          state ? (
            <UserBalance userBalance="500" onClick={() => setPopupOpen(true)}/>
          ) : (
            <DevBalance devBalance="5001" onClick={() => setPopupOpen(true)}/>
          )
        ) : (
          <UserBalance userBalance="500" onClick={() => setPopupOpen(true)}/>
        )}
        <ListTransaction />
      </div>
    </>
  );
}