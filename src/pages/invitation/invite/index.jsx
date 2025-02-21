import React from "react";
import "./styles.css";

import { Instruction, YourLink } from "./ui";
import { useGoBack } from "../../../shared/model";

export default function Invite() {
  useGoBack(`/invitation`)
  return (
    <>
      <div className="container-invite">
        <YourLink
          inviteLink={`http://t.me/kihelp/app?startapp=${window.Telegram.WebApp.initDataUnsafe.user.id}`}
        />
        <Instruction/>
      </div>
    </>
  );
}
