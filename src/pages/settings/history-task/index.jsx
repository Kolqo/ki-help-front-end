import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

import ListTask from "./ui/list-task";

import { useGoBack } from "../../../shared/model";

export default function HistoryTask() {

  const location = useLocation();
  const { user } = location.state || {};
  console.log( user )
  useGoBack(user ? `/settings/admin-panel/profile` : `/settings` );
  const telegramId = user ? user.telegramId : window.Telegram.WebApp.initDataUnsafe.user.id
  
  return (
    <>
      <div className="container-history-task"> 
        <ListTask telegramId={telegramId}/>
      </div>
    </>
  );
}