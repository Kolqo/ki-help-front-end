import React from "react";
import ProfileIcon from "../assets/profile-icon";
import "./styles.css";

export default function InvitedUser(props) {
  return (
    <>
      <div className="class-invited-user">
        <ProfileIcon/>
        <p>{props.invitedUser.user.username}</p>
        <span>{props.invitedUser.spendBalance} UAH</span>
      </div>
    </>
  );
}