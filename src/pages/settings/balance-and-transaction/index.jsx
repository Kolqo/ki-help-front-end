import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import "./styles.css";

import { ActionSwitch, ErrorMessage } from "../../../shared/ui";
import { DevBalance, ListTransaction, UserBalance, PopupDeposit } from "./ui";

import { useToggle, useSelectedUserBalance, useGoBack } from "../../../shared/model";
import useAdminDeposit from "./model/useAdminDeposit.js";

export default function BalanceAndTransaction() {
  useGoBack(`/settings/admin-panel/profile`)
  const location = useLocation();
  const { user } = location.state || {};

  const [isDev, setIsDev] = useState(false);
  const [balance, setBalance] = useState(0);
  const { state, toggle } = useToggle(true);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const { data: selectedUserBalance, refetch } = useSelectedUserBalance(user.telegramId);
  const { error, errorMessage, isLoading, handleDeposit } = useAdminDeposit();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      setIsDev(decoded.roles.includes("ROLE_DEVELOPER"));
    }
  }, []);

  useEffect(() => {
    if (selectedUserBalance && Array.isArray(selectedUserBalance)) {
      const desiredName = state ? "Загальний гаманець" : "Dev гаманець";
      const foundBalance = selectedUserBalance.find(
        (userBalance) => userBalance.name === desiredName
      );
      if (foundBalance) {
        setBalance(foundBalance.balance);
      } else {
        setBalance(0);
      }
    }
  }, [selectedUserBalance, state]);

  const onDeposit = async (amount) => {
    try {
      await handleDeposit(amount, user.telegramId);
      refetch();
    } catch (e) {
    } finally {
      setPopupOpen(false);
    }
  };

  return (
    <div className="container-balance-and-transaction-admin">
      <ErrorMessage error={error}>
        {errorMessage}
      </ErrorMessage>
      {isPopupOpen && (
        <PopupDeposit
          onCancel={() => setPopupOpen(false)}
          onDeposit={onDeposit}
          isLoading={isLoading}
          user={user}
        />
      )}
      {isDev && (
        <ActionSwitch
          leftText="Загальний"
          rightText="Dev"
          isSwitch={state}
          setIsSwitch={toggle}
        />
      )}
      {isDev && !state ? (
        <DevBalance devBalance={balance} onClick={() => setPopupOpen(true)} />
      ) : (
        <UserBalance
          userBalance={balance}
          onClick={() => setPopupOpen(true)}
        />
      )}
      <ListTransaction user={user} />
    </div>
  );
}