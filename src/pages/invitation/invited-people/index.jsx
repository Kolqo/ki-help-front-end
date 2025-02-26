import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Button, ErrorMessage } from "../../../shared/ui";
import { InviteList, TakeBonus } from "./ui";

import { useIsAvailableBonusClaim } from "./model/useIsAvailableBonusClaim.js";
import { useDepositAmount } from "./model/useDepositAmount.js";
import { useSelectedInvitedUsers } from "./model/useSelectedInvitedUsers.js";

export default function InvitedPeople() {
  const navigate = useNavigate();

  const isAvailableBonusClaim = useIsAvailableBonusClaim();
  const { error, errorMessage, handleBonusClaim } = useDepositAmount();
  const invitedPeople = useSelectedInvitedUsers();

  const isLimitInvitedPeople = invitedPeople.selectedInvitedUsers >= 3;

  return (
    <>
      <div className="container-invited-people">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="invited-people">
          <TakeBonus
            isAvailableBonusClaim={isAvailableBonusClaim}
            onClick={handleBonusClaim}
          />
          <InviteList invitedPeople={invitedPeople} />
        </div>
        {!isLimitInvitedPeople && (
          <Button
            className="blue-button fixed-button"
            onClick={() => navigate(`/invitation/invite`)}
            style={{ bottom: 135 }}
          >
            Запросити
          </Button>
        )}
      </div>
    </>
  );
}
