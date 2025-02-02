import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import { Button } from "../../../shared/ui";
import { InviteList, TakeBonus } from "./ui";

export default function InvitedPeople() {
  return (
    <>
      <div className="container-invited-people">
        <div className="invited-people">
          <TakeBonus bonusAmount="0" />
          <InviteList />
        </div>
        <Link to="/invitation/invite" className="invited-people-button-box no-underline">
          <Button
            className="blue-button invited-people-button"
          >
            Запросити
          </Button>
        </Link>
      </div>
    </>
  );
}
