import React, { useState, useEffect } from "react";
import "./styles.css";

import { Button } from "../../../../../shared/ui";

export default function TakeBonus(props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (props.isAvailableBonusClaim && !clicked) {
      setClicked(true);
    }
  };

  useEffect(() => {
    if (clicked) {
      props.onClick();
    }
  }, [clicked, props]);

  return (
    <div className="style-take-bones">
      <div className="content-take-bones">
        <p>{props.isAvailableBonusClaim && !clicked ? "100" : "0"} UAH</p>
        <Button
          className={`take-bones-button ${
            props.isAvailableBonusClaim && !clicked
              ? "blue-button"
              : "nonactive-button"
          }`}
          onClick={handleClick}
        >
          Забрати
        </Button>
      </div>
      <p>
        Кожен із ваших запрошених друзів, витративши 100 UAH, принесе вам 100 UAH на рахунок.
      </p>
    </div>
  );
}