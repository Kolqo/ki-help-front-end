import React from "react";
import "./styles.css";

import { InvitedUser } from "../../../../../entities";
import { Tgs } from "../../../../../shared/ui";

import { useSelectedInvitedUsers } from "../../model/useSelectedInvitedUsers.js"

import Moon from "../../assets/tgs/Moon.tgs";

export default function InviteList() {
  const selectedInvitedUsers = useSelectedInvitedUsers()
  const isAnyInvited = selectedInvitedUsers.length > 0;

  return (
    <>
      <div className="style-invite-list">
        <p>ЗАПРОШЕНІ ЛЮДИ</p>
        {isAnyInvited ? (
          <div className="invite-list">
            {selectedInvitedUsers.map((item) => (
              <InvitedUser key={item.user.telegramId} invitedUser={item}/>
            ))}
          </div>
        ) : (
          <div className="empty-list">
            <Tgs src={Moon} isLoop isAutoplay></Tgs>
            <p>Рефералів ще немає</p>
            <div>
              Рефералів ще немає. Щойно ваш друг прийме запрошення, він з’явиться тут.
            </div>
          </div>
        )}
      </div>
    </>
  );
}