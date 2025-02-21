import React from "react";
import ProfileIcon from "../assets/profile-icon";
import "./styles.css";

export default function InvitedUser(props) {
  return (
    <>
      <div className="class-invited-user">
        {props.invitedUser.user.photo ? <img src={props.invitedUser.user.photo}/> : <ProfileIcon/>}
        <p>{props.invitedUser.user.username ? props.invitedUser.user.username : "Unknown"}</p>
        <span>{props.invitedUser.spendBalance} UAH</span>
      </div>
    </>
  );
}