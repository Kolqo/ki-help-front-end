import React from "react";
import "./styles.css";

import Arguments from "./ui/arguments";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useShowPopup } from "../../../shared/model";
import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model";
import useSubmitArguments from "./model/useSubmitArguments";

import getArguments from "../../../entities/checkbox-list/api/getArguments";

export default function ChooseArgument() {
  const menuState = useShowPopup();

  const { checkedState, setCheckedState } = useObjState(getArguments);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const { handleSubmitUserCourse, error } = useSubmitArguments(checkedState);

  return (
    <>
      <div className="container-choose-argument">
        <ErrorMessage isError={error}>
          Будь ласка, оберіть лише одного викладача.
        </ErrorMessage>
        <Arguments
          isChecked={checkedState}
          setIsChecked={handleCheckboxChangeState}
          menuState={menuState}
          listObject={getArguments}
        />
        <Button
          className="blue-button argument-button"
          onClick={() => handleSubmitUserCourse(checkedState)}
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
