import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { HistoryTaskIcon, MoreIcon, WalletIcon } from "../../assets";
import { TopIconButton, PropertyItem, AdminPopup } from "../../../../shared/ui";

import userItems from "../../const/userItems.jsx";
import editUserPopupItems from "../../../../shared/const/editUserPopupItems.jsx";

export default function User(props) {
  const navigate = useNavigate();

  const handleBanClick = (user) => {
    props.setPopupOpen(true)
    props.setUser(user)
  }

  return (
    <>
      <div className="style-user" onClick={() => console.log(props.user)}>
        <div className="user-info">
          <div className="user-photo">
            {props.user.photo != "" ? (
              <img src={props.user.photo} />
            ) : (
              <div className="non-photo" />
            )}
          </div>
          {userItems(props.user).map((item) => (
            <PropertyItem key={item.id} className="item" propertyItem={item} />
          ))}
        </div>
        <div className="user-on-action">
          {props.menuState.selectedId === props.user.telegramId && (
            <AdminPopup
              adminPopup={editUserPopupItems(props.user.isBanned)}
              showPopup={props.menuState.showMenu}
              popupPosition={props.menuState.menuPosition}
              onClickTop={() =>
                navigate(`/settings/admin-panel/profile/give-role`, {
                  state: { user: props.user },
                })
              }
              onClickBottom={() => handleBanClick(props.user)}
            />
          )}
          <TopIconButton
            leftIcon={<WalletIcon />}
            className="user-action-button gray-button no-select"
            onClick={() =>
              navigate(`/settings/admin-panel/profile/wallet`, {
                state: { user: props.user },
              })
            }
          >
            Гаманець
          </TopIconButton>
          <TopIconButton
            leftIcon={<HistoryTaskIcon />}
            className="user-action-button gray-button no-select"
            onClick={() =>
              navigate(`/settings/admin-panel/profile/history-task`, {
                state: { user: props.user },
              })
            }
          >
            Історія завдань
          </TopIconButton>
          <TopIconButton
            leftIcon={<MoreIcon />}
            className="user-action-button gray-button no-select"
            menuState={props.menuState}
            item={props.user}
          >
            Більше
          </TopIconButton>
        </div>
      </div>
    </>
  );
}
