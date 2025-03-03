import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

import { ErrorMessage, GrayInput } from "../../../shared/ui";
import { UserList, PopupDiscount, LoadingUserItem } from "./ui";
import { useSelectedUsers, useSubmitUser, useFilterUsers } from "./model";
import { useGoBack } from "../../../shared/model";

export default function ChooseUser() {
  const { subjectID } = useParams;
  useGoBack(`/list-task/edit-task/${subjectID}/give-discount`);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState();
  const [amount, setAmount] = useState();

  const {
    errorSelected,
    errorMessageSelected,
    isLoadingSelected,
    selectedUsers,
  } = useSelectedUsers("ROLE_USER");
  const { error, errorMessage, handleSubmitUser } = useSubmitUser();
  const filteredUsers = useFilterUsers(inputValue, selectedUsers);

  const handleClickUser = (user) => {
    setUser(user);
    setPopupOpen(true);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  console.log(user, isPopupOpen, amount);
  return (
    <>
      <div className="container-choose-user">
        <ErrorMessage isError={error || errorSelected}>
          {error ? errorMessage : errorMessageSelected}
        </ErrorMessage>
        <div className="input">
          <GrayInput
            placeholder="Пошук по Telegram ID"
            onChange={setInputValue}
          />
        </div>
        {isLoadingSelected ? (
          <LoadingUserItem />
        ) : (
          <UserList onClick={handleClickUser} selectedUsers={filteredUsers} />
        )}

        {isPopupOpen && (
          <PopupDiscount
            onClickCancel={() => setPopupOpen(false)}
            onClickGive={() => handleSubmitUser(user, amount, subjectID)}
            onChange={handleAmountChange}
          />
        )}
      </div>
    </>
  );
}
