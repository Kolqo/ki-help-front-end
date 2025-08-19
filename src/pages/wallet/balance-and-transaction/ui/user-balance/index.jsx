import "./styles.css";

import { Link } from 'react-router-dom'
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
        <Link to="/wallet/deposit" className="user-balance-button no-underline ">
          <Button
            className="gray-button user-balance-button"
            leftIcon={<AdderIcon />}
          >
            Поповнити
          </Button>
        </Link>
      </div>
    </>
  );
}
