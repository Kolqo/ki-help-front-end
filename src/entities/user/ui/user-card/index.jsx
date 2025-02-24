import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { HistoryTaskIcon, MoreIcon, WalletIcon } from "../../assets";
import { TopIconButton, PropertyItem, AdminPopup } from "../../../../shared/ui";

import userItems from "../../const/userItems.jsx";
import editUserPopupItems from "../../../../shared/const/editUserPopupItems.jsx";

export default function User(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="style-user">
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
          <AdminPopup
            adminPopup={editUserPopupItems}
            showPopup={props.menuState.showMenu}
            popupPosition={props.menuState.menuPosition}
            topTo="/settings/admin-panel/profile/give-role"
          />
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
          >
            Більше
          </TopIconButton>
        </div>
      </div>
    </>
  );
}
