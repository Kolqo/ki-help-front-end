import React, { useState} from "react";
import "./styles.css";

import { GrayInput } from "../../../shared/ui";
import { UserList, PopupDiscount} from "./ui"

export default function ChooseUser() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <div className="container-choose-user">
        <div className="input"><GrayInput placeholder="Пошук по Telegram ID"/></div>
        <UserList onClick={() => setPopupOpen(true)}/>
        {isPopupOpen && <PopupDiscount onClick={() => setPopupOpen(false)}/>}
      </div>
    </>
  );
}
