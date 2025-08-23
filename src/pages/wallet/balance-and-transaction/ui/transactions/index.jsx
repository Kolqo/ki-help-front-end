import "./styles.css";

import { LoadingTransaction, Transaction } from "../../../../../entities";
import {
  CategoriesWrapper,
  EmptyList,
  SectionWrapper,
} from "../../../../../shared/ui";

import { MoonTgs } from "../../../../../shared/assets/tgs";
import { ArrowIcon } from "../../../../../shared/assets/svg";

export default function Transactions(props) {
  const transactions = props.getTransactionsState.transactions;

  if (transactions.length === 0 && !props.getTransactionsState.isLoading) {
    return (
      <SectionWrapper section={{ header: "ІСТОРІЯ ТРАНЗАКЦІЙ" }}>
        <EmptyList
          icon={MoonTgs}
          text={{
            header: "Історії ще немає",
            footer: "Щойно ви здійснете транзакцію, вона з’явиться тут.",
          }}
        />
      </SectionWrapper>
    );
  }

  return (
    <>
      <div className="style-transactions">
        <SectionWrapper section={{ header: "ІСТОРІЯ ТРАНЗАКЦІЙ" }}>
          <CategoriesWrapper>
            {transactions.map((item) => (
              <Transaction
                key={item.id}
                item={item}
                isDevMode={props.isDevMode}
              />
            ))}
          </CategoriesWrapper>
          {!props.isMoreTr && !props.getTransactionsState.isLoading && (
            <div
              className="transactions-footer"
              onClick={() => props.setIsMoreTr(true)}
            >
              Більше транзакцій <ArrowIcon />
            </div>
          )}
        </SectionWrapper>
        {props.getTransactionsState.isLoading && (
          <LoadingTransaction count={5} />
        )}
      </div>
    </>
  );
}
