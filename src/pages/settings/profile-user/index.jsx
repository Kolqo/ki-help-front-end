import React, { useState } from "react";
import "./styles.css";

import { GrayInput, ErrorMessage } from "../../../shared/ui";
import { ListUser, LoadingUser } from "./ui";

import { useShowPopup, useGoBack } from "../../../shared/model";
import { useSelectedUser, useFilterUsers } from "./model";

export default function ProfileUser() {
  useGoBack(`/settings/admin-panel`);

  const menuState = useShowPopup();
  const [ inputValue, setInputValue ] = useState()
  const { error, errorMessage, isLoading, selectedUsers } = useSelectedUser();

  const filteredUsers = useFilterUsers(inputValue, selectedUsers)

  return (
    <>
      <div className="container-profile-user">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <GrayInput placeholder="Пошук по Telegram ID" onChange={setInputValue}/>
        {isLoading ? (
          <LoadingUser />
        ) : (
          <ListUser menuState={menuState} selectedUsers={filteredUsers} />
        )}
      </div>
    </>
  );
}
