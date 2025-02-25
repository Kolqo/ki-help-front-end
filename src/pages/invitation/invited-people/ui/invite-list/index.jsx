import React from "react";
import "./styles.css";

import { InvitedUser } from "../../../../../entities";
import { ErrorMessage, Tgs } from "../../../../../shared/ui";

import Moon from "../../assets/tgs/Moon.tgs";
import { LoadingInvitedPeople } from "../index.js";

export default function InviteList(props) {
  const isAnyInvited = props.invitedPeople.selectedInvitedUsers.length > 0 || props.invitedPeople.isLoading;

  return (
    <>
      <div className="style-invite-list">
        <ErrorMessage error={props.invitedPeople.error}>{props.invitedPeople.errorMessage}</ErrorMessage>
        <p>ЗАПРОШЕНІ ЛЮДИ</p>
        {isAnyInvited ? (
          props.invitedPeople.isLoading ? (
            <LoadingInvitedPeople />
          ) : (
            <div className="invite-list">
              {props.invitedPeople.selectedInvitedUsers.map((item) => (
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
