import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { Button } from "../../../../../shared/ui";
import { DownloadIcon } from "../../../../../shared/assets/svg";

export default function DevBalance(props) {
  return (
    <>
      <div className="style-dev-balance">
        <p>Dev баланс</p>
        <div className="dev-balance">
          <span>₴</span>
          <p>{props.devBalance}</p>
        </div>
        <Link
          to="/wallet/withdraw"
          className="dev-balance-button no-underline "
        >
          <Button
            className="gray-button dev-balance-button"
            leftIcon={<DownloadIcon />}
          >
            Зняти
          </Button>
        </Link>
      </div>
    </>
  );
}
