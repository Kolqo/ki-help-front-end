import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

import { ErrorMessage, GrayInput } from "../../../shared/ui";
import { UserList, PopupDiscount } from "./ui";
import { useSelectedUsers, useSubmitUser } from "./model";
import { useGoBack } from "../../../shared/model";

export default function ChooseUser() {
  const { subjectID } = useParams
  useGoBack(`/list-task/edit-task/${subjectID}/give-discount`)
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const { errorSelected, errorMessageSelected, isLoadingSelected, selectedUsers } =
  useSelectedUsers("ROLE_USER");
  const { error, errorMessage, handleSubmitUser } = useSubmitUser()

  return (
    <>
      <div className="container-choose-user">
        <ErrorMessage isError={error || errorSelected}>
          {error ? errorMessage : errorMessageSelected}
        </ErrorMessage>
        <div className="input">
          <GrayInput placeholder="Пошук по Telegram ID" />
        </div>
        <UserList onClick={() => setPopupOpen(true)} selectedUsers={selectedUsers}/>
        {isPopupOpen && (
          <PopupDiscount onClickCancel={() => setPopupOpen(false)} 
          onClickGive={() => handleSubmitUser(subjectID)}/>
        )}
      </div>
    </>
  );
}
