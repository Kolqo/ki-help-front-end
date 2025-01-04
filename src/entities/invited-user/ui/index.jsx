import React from "react";
import ProfileIcon from "../assets/profile-icon";
import "./styles.css";

export default function InvitedUser(props) {
  return (
    <>
      <div className="class-invited-user">
        <ProfileIcon/>
        <p>{props.userName}</p>
        <span>{props.amount} UAH</span>
      </div>
    </>
  );
}