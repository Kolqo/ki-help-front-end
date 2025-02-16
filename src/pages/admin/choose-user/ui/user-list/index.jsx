import React from "react";
import "./styles.css";

import { UserListItem } from "../../../../../entities";
import getUser from "../../../../../entities/user/api/getUser.js"

export default function UserList(props) {

  return (
    <>
      <div className="style-user-list">
        {getUser.map((user) => (
          <UserListItem user={user} onClick={props.onClick}/>
        ))}
      </div>
    </>
  );
}
