import React from "react";
import "./styles.css";

import { GrayInput } from "../../../shared/ui"
import ListUser from "./ui/list-user";

import { useShowPopup } from "../../../shared/model"
 
export default function ProfileUser() {
  const menuState = useShowPopup();

  return (
    <>
      <div className="container-profile-user"> 
        <GrayInput placeholder="Пошук по Telegram ID"/>
        <ListUser menuState={menuState}/>
      </div>
    </>
  );
}