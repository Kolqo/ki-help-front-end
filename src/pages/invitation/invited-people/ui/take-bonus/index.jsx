import React from "react";
import "./styles.css";

import { Button } from "../../../../../shared/ui";

export default function TakeBonus(props) {
  return (
    <>
      <div className="style-take-bones">
        <div className="content-take-bones">
          <p>{props.bonusAmount} UAH</p>
          <Button
            className={`take-bones-button ${
              props.bonusAmount.length > 100
                ? "blue-button"
                : "nonactive-button"
            }`}
          >
            Забрати
          </Button>
        </div>
        <p>
          Кожен із ваших запрошених друзів, витративши 100 UAH, принесе вам 100 UAH на рахунок.
        </p>
      </div>
    </>
  );
}
