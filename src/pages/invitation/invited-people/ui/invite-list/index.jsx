import React from "react";
import "./styles.css";

import { InvitedUser } from "../../../../../entities";
import { ErrorMessage, Tgs } from "../../../../../shared/ui";

import { useSelectedInvitedUsers } from "../../model/useSelectedInvitedUsers.js";

import Moon from "../../assets/tgs/Moon.tgs";
import { LoadingInvitedPeople } from "../index.js";

export default function InviteList() {
  const { error, errorMessage, isLoading, selectedInvitedUsers } =
    useSelectedInvitedUsers();
  const isAnyInvited = selectedInvitedUsers.length > 0 || isLoading;

  return (
    <>
      <div className="style-invite-list">
        <ErrorMessage error={error}>{errorMessage}</ErrorMessage>
        <p>ЗАПРОШЕНІ ЛЮДИ</p>
        {isAnyInvited ? (
          isLoading ? (
            <LoadingInvitedPeople />
          ) : (
            <div className="invite-list">
              {selectedInvitedUsers.map((item) => (
                <InvitedUser key={item.user.telegramId} invitedUser={item} />
              ))}
            </div>
          )
        ) : (
          <div className="empty-list">
            <Tgs src={Moon} isLoop isAutoplay></Tgs>
            <p>Рефералів ще немає</p>
            <div>
              Рефералів ще немає. Щойно ваш друг прийме запрошення, він
              з’явиться тут.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
