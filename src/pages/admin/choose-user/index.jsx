import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { GrayInput } from "../../../shared/ui";
import { UserList, PopupDiscount } from "./ui";

export default function ChooseUser() {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <div className="container-choose-user">
        <div className="input">
          <GrayInput placeholder="Пошук по Telegram ID" />
        </div>
        <UserList onClick={() => setPopupOpen(true)} />
        {isPopupOpen && (
          <PopupDiscount onClickCancel={() => setPopupOpen(false)} 
          onClickGive={() => (navigate(`/edit-task/give-discount`))}/>
        )}
      </div>
    </>
  );
}
