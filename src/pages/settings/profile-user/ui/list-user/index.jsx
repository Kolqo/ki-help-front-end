import React from "react";
import "./styles.css";

import getUser from "../../../../../entities/user/api/getUser"
import { User } from "../../../../../entities";

export default function ListUser() {
  return (
    <>
      <div className="style-list-user"> 
        {getUser.map((item) => (
          <User key={item.telegramId} user={item}/>
        ))}
      </div>
    </>
  );
}