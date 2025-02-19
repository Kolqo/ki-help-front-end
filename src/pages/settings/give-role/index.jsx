import React from "react";
import "./styles.css";

import Roles from "./ui/roles";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useShowPopup } from "../../../shared/model";
import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model";
import useSubmitRole from "./model/useSubmitRole";

import getRoles from "../../../entities/checkbox-list/const/getRoles";

export default function ChooseArgument() {
  const menuState = useShowPopup();

  const { checkedState, setCheckedState } = useObjState(getRoles);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const { handleSubmitUserRole, error } = useSubmitRole(checkedState);

  return (
    <>
      <div className="container-choose-role">
        <ErrorMessage isError={error}>
          Будь ласка, оберіть лише одну роль.
        </ErrorMessage>
        <Roles
          isChecked={checkedState}
          setIsChecked={handleCheckboxChangeState}
          menuState={menuState}
          listObject={getRoles}
        />
        <Button
          className="blue-button fixed-button"
          onClick={() => handleSubmitUserRole(checkedState)}
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
