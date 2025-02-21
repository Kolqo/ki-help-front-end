import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Button } from "../../../shared/ui";
import { InviteList, TakeBonus } from "./ui";

import { useIsAvailableBonusClaim } from "./model/useIsAvailableBonusClaim.js";
import { useDepositAmount } from "./model/useDepositAmount.js";

export default function InvitedPeople() {
  const navigate = useNavigate();

  const isAvailableBonusClaim = useIsAvailableBonusClaim();
  const handleBonusClaim = useDepositAmount();

  return (
    <>
      <div className="container-invited-people">
        <div className="invited-people">
          <TakeBonus isAvailableBonusClaim={isAvailableBonusClaim} onClick={handleBonusClaim}/>
          <InviteList />
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => navigate(`/invitation/invite`)}
          style={{ bottom: 115 }}
        >
          Запросити
        </Button>
      </div>
    </>
  );
}
