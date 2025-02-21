import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./styles.css";

import { ActionSwitch } from "../../../shared/ui";
import { DevBalance, ListTransaction, UserBalance } from "./ui";

import { useToggle, useSelectedUserBalance } from "../../../shared/model";

export default function BalanceAndTransaction() {
  const [isDev, setIsDev] = useState(false);
  const [balance, setBalance] = useState(0);
  const { state, toggle } = useToggle(true);

  const selectedUserBalance = useSelectedUserBalance(
    window.Telegram.WebApp.initDataUnsafe.user.id
  );
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      setIsDev(decoded.roles.includes("ROLE_DEVELOPER"));
    }
  }, []);

  useEffect(() => {
    if (selectedUserBalance) {
      setBalance(selectedUserBalance[state ? 0 : 1].balance);
    }
  }, [selectedUserBalance, state]);
  
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
        {isDev && !state ? (
          <DevBalance devBalance={balance} />
        ) : (
          <UserBalance userBalance={balance} />
        )}
        <ListTransaction />
      </div>
    </>
  );
}
