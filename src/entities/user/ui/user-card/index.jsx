import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import { HistoryTaskIcon, MoreIcon, WalletIcon } from "../../assets/index.jsx";
import { Button, PropertyItem } from "../../../../shared/ui/index.jsx";
import userItems from "../../const/userItems.jsx";

export default function User(props) {
  return (
    <>
      <div className="style-user">
        <div className="user-info">
          <div className="user-online-indicator">
            <div className="indicator" />
          </div>
          {userItems(props.user).map((item) => (
            <PropertyItem key={item.id} className="item" propertyItem={item} />
          ))}
        </div>
        <div className="user-on-action">
          <Link to="/settings/admin-panel/profile/history-task" className="no-underline user-action-button-box">
            <Button
              leftIcon={<WalletIcon />}
              className="user-action-button gray-button no-select"
            >
              Гаманець
            </Button>
          </Link>
          <Link to="/settings/admin-panel/profile/wallet" className="no-underline user-action-button-box">
            <Button
              leftIcon={<HistoryTaskIcon />}
              className="user-action-button gray-button no-select"
            >
              Історія завдань
            </Button>
          </Link>
          <Link to="/settings/admin-panel/profile/give-role" className="no-underline user-action-button-box"> 
            <Button
              leftIcon={<MoreIcon />}
              className="user-action-button gray-button no-select"
            >
              Більше
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
