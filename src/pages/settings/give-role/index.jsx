import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

import Roles from "./ui/roles";
import { Button, ErrorMessage, Loading } from "../../../shared/ui";

import { useShowPopup, useGoBack } from "../../../shared/model";
import {
  useObjState,
  useChangeObjState,
} from "../../../entities/checkbox-list/model";
import useSubmitRole from "./model/useSubmitRole";

import getRoles from "../../../entities/checkbox-list/const/getRoles";

export default function ChooseRole() {
  const location = useLocation();
  const { user } = location.state || {};

  useGoBack(`/settings/admin-panel/profile`);

  const menuState = useShowPopup();

  const { checkedState, setCheckedState } = useObjState(getRoles);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const { error, errorMessage, isLoading, handleSubmitUserRole } =
    useSubmitRole(checkedState);
  console.log(user);
  return (
    <>
      <div className="container-choose-role">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <Roles
          isChecked={checkedState}
          setIsChecked={handleCheckboxChangeState}
          menuState={menuState}
          listObject={getRoles}
        />
        <Button
          className="blue-button fixed-button"
          onClick={() => handleSubmitUserRole(user.telegramId, getRoles)}
          disabled={isLoading}
          leftIcon={isLoading && <Loading className="buying-task-spinner" />}
        >
          {isLoading ? "Очікуйте" : "Вибрати"}
        </Button>
      </div>
    </>
  );
}
