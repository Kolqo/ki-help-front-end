import React from "react";
import "./styles.css";

import { GrayInput } from "../../../shared/ui"
import ListUser from "./ui/list-user";

export default function ProfileUser() {
  return (
    <>
      <div className="container-profile-user"> 
        <GrayInput/>
        <ListUser/>
      </div>
    </>
  );
}