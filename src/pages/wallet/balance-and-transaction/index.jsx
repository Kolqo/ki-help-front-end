import React, { useState } from "react";
import "./styles.css";

import { ActionSwitch } from "../../../shared/ui";
import { DevBalance, ListTransaction, UserBalance } from "./ui";
import useToggle from "../../../shared/model/useToggle";

export default function BalanceAndTransaction() {
  const [isDev] = useState(true);
  const { state, toggle } = useToggle(true);

  return (
    <>
      <div className="container-balance-and-transaction">
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
            <UserBalance userBalance="500" />
          ) : (
            <DevBalance devBalance="5001" />
          )
        ) : (
          <UserBalance userBalance="500" />
        )}
        <ListTransaction />
      </div>
    </>
  );
}
