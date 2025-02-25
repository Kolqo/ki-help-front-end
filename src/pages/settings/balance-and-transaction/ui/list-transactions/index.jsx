import React from "react";
import "./styles.css";

import { Transaction } from "../../../../../entities";
import { Tgs, ErrorMessage } from "../../../../../shared/ui";
import { LoadingTransactions } from "../";

import { useSelectedTransactions } from "../../../../../shared/model";

import Moon from "../../assets/tgs/Moon.tgs";

export default function ListTransactions(props) {
  const { error, errorMessage, isLoading, selectedTransactions } =
    useSelectedTransactions(props.user.telegramId);

  const isAnyTransactions = selectedTransactions.length > 0 || isLoading;
  return (
    <>
      <div className="style-list-transactions">
        <ErrorMessage error={error}>{errorMessage}</ErrorMessage>
        <p>ІСТОРІЯ ТРАНЗАКЦІЙ</p>
        {isAnyTransactions ? (
          isLoading ? (
            <LoadingTransactions />
          ) : (
            <div className="list-transactions">
              {selectedTransactions.map((item) => (
                <Transaction
                  key={item.transactionId}
                  transaction={item}
                ></Transaction>
              ))}
            </div>
          )
        ) : (
          <div className="empty-list">
            <Tgs src={Moon} isLoop isAutoplay></Tgs>
            <p>Історії ще немає</p>
            <div>
              Історії ще немає. Щойно ви здійснете транзакцію, вона з’явиться
              тут.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
