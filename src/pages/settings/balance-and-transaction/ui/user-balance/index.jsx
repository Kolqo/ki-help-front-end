import React from "react";
import "./styles.css";

import { Button } from "../../../../../shared/ui";
import { AdderIcon } from "../../../../../shared/assets/svg";

export default function DevBalance(props) {
  return (
    <>
      <div className="style-user-balance">
        <p>Загальний баланс</p>
        <div className="user-balance">
          <span>₴</span>
          <p>{props.userBalance}</p>
        </div>
        <Button
          className="gray-button user-balance-button"
          leftIcon={<AdderIcon />}
          onClick={props.onClick}
        >
          Поповнити
        </Button>
      </div>
    </>
  );
}
