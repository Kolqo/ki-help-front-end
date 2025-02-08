import React from "react";
import "./styles.css";

import { InvitedUser } from "../../../../../entities";
import getInvitedUser from "../../../../../entities/invited-user/app/getInvitedUser";
import { Tgs } from "../../../../../shared/ui";
import Moon from "../../assets/tgs/Moon.tgs";

export default function InviteList() {
  const isAnyInvited = getInvitedUser.length > 0;
  return (
    <>
      <div className="style-invite-list">
        <p>ЗАПРОШЕНІ ЛЮДИ</p>
        {isAnyInvited ? (
          <div className="invite-list">
            {getInvitedUser.map((item) => (
              <InvitedUser key={item.user.telegramID} invitedUser={item}/>
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