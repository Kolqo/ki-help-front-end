import React from "react";
import "./styles.css";

import { UserListItem } from "../../../../../entities";

export default function UserList(props) {

  return (
    <>
      <div className="style-user-list">
        {props.selectedUsers.map((user) => (
          <UserListItem user={user} onClick={props.onClick}/>
        ))}
      </div>
    </>
  );
}
