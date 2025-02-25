import React, { useState } from "react";
import "./styles.css";

import { GrayInput, ErrorMessage } from "../../../shared/ui";
import { ListUser, LoadingUser } from "./ui";

import { useShowPopup, useGoBack, useRoles } from "../../../shared/model";
import { useSelectedUser, useFilterUsers, useBanUser } from "./model";

export default function ProfileUser() {
  useGoBack(`/settings/admin-panel`);

  const menuState = useShowPopup();
  const [inputValue, setInputValue] = useState();
  const { error, errorMessage, isLoading, selectedUsers } = useSelectedUser();
  const { errorBan, errorMessageBan, isLoadingBan, handleBan } = useBanUser();

  const filteredUsers = useFilterUsers(inputValue, selectedUsers);

  const { jwt } = useRoles();
  console.log(jwt);

  return (
    <>
      <div className="container-profile-user">
        <ErrorMessage isError={error || errorBan}>{error ? errorMessage : errorMessageBan}</ErrorMessage>
        <GrayInput
          placeholder="Пошук по Telegram ID"
          onChange={setInputValue}
        />
        {isLoading ? (
          <LoadingUser />
        ) : (
          <ListUser menuState={menuState} selectedUsers={filteredUsers} handleBan={handleBan}/>
        )}
      </div>
    </>
  );
}
