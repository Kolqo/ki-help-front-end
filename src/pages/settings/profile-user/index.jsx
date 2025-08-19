import { useState } from "react";
import "./styles.css";

import { GrayInput, ErrorMessage, DeletePopup } from "../../../shared/ui";
import { ListUser, LoadingUser } from "./ui";

import { useShowPopup, useGoBack } from '../../../shared/hooks'
import { useSelectedUser, useFilterUsers, useBanUser } from "./model";

export default function ProfileUser() {
  useGoBack(`/settings/admin-panel`);

  const [inputValue, setInputValue] = useState();
  const [user, setUser] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const menuState = useShowPopup();
  const { error, errorMessage, isLoading, selectedUsers } = useSelectedUser();
  const { errorBan, errorMessageBan, isLoadingBan, handleBan } = useBanUser();
  const filteredUsers = useFilterUsers(inputValue, selectedUsers);

  const handleBanClick = async () => {
    await handleBan(user)
    setPopupOpen(false)
  }

  return (
    <>
      <div className="container-profile-user">
        <ErrorMessage isError={error || errorBan}>
          {error ? errorMessage : errorMessageBan}
        </ErrorMessage>
        {isPopupOpen && (
          <DeletePopup
            onClickCancel={() => setPopupOpen(false)}
            onClickConfirm={() => handleBanClick()}
          />
        )}
        <GrayInput
          placeholder="Пошук по Telegram ID"
          onChange={setInputValue}
        />
        {isLoading ? (
          <LoadingUser />
        ) : (
          <ListUser
            menuState={menuState}
            selectedUsers={filteredUsers}
            setPopupOpen={setPopupOpen}
            setUser={setUser}
          />
        )}
      </div>
    </>
  );
}
