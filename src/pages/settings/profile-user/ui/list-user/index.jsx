import React from "react";
import "./styles.css";

import getUser from "../../../../../entities/user/api/getUser"
import { UserCard } from "../../../../../entities";

export default function ListUser(props) {
  return (
    <>
      <div className="style-list-user"> 
        {getUser.map((item) => (
          <UserCard key={item.telegramId} user={item} menuState={props.menuState}/>
        ))}
      </div>
    </>
  );
}