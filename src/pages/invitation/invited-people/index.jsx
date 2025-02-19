import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Button } from "../../../shared/ui";
import { InviteList, TakeBonus } from "./ui";

export default function InvitedPeople() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-invited-people">
        <div className="invited-people">
          <TakeBonus bonusAmount="0" />
          <InviteList />
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => navigate(`/invitation/invite`)}
          style={{bottom: 115}}
        >
          Запросити
        </Button>
      </div>
    </>
  );
}
