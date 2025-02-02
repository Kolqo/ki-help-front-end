import React from "react";
import "./styles.css";

import { Instruction, YourLink } from "./ui";

export default function Invite() {
  return (
    <>
      <div className="container-invite">
        <YourLink
          inviteLink="http://t.me/kihelp/app?startapp=3232323"
        />
        <Instruction/>
      </div>
    </>
  );
}
