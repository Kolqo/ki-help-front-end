import React from "react";
import "./styles.css";

import getUser from "../../../../../entities/user/api/getUser"
import { UserListItem } from "../../../../../entities";

export default function ListUser() {
  return (
    <>
      <div className="style-list-user"> 
        {getUser.map((item) => (
          <UserListItem key={item.telegramId} user={item}/>
        ))}
      </div>
    </>
  );
}