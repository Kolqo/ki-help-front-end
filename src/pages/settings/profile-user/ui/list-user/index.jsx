import React from "react";
import "./styles.css";

import { UserCard } from "../../../../../entities";

export default function ListUser(props) {

  return (
    <>
      <div className="style-list-user">
        {props.selectedUsers.map((item) => (
          <UserCard
            key={item.telegramId}
            user={item}
            menuState={props.menuState}
          />
        ))}
      </div>
    </>
  );
}
