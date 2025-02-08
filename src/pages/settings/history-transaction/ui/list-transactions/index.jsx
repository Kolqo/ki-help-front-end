import React from "react";
import "./styles.css";

import { Transaction } from "../../../../../entities";
import getTransactions from "../../../../../entities/transaction/api/getTransactions";
import { Tgs } from "../../../../../shared/ui";
import Moon from "../../assets/tgs/Moon.tgs";

export default function ListTransactions() {
  const isAnyTransactions = getTransactions.length > 0;
  return (
    <>
      <div className="style-list-transactions-admin">
        <p>Історія транзакцій</p>
        {isAnyTransactions ? (
          <div className="list-transactions">
            {getTransactions.map((item) => (
              <Transaction
                key={item.transactionId}
                transaction={item}
              ></Transaction>
            ))}
          </div>
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
