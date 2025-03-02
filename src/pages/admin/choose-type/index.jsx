import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import Types from "./ui/types";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useGoBack, useShowPopup } from "../../../shared/model";
import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model";
import useSubmitType from "./model/useSubmitType";

import getTypes from "../../../entities/checkbox-list/const/getTypes";

export default function ChooseArgument() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/add-task/${subjectID}`);

  const menuState = useShowPopup();

  const { checkedState, setCheckedState } = useObjState(getTypes);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const { handleSubmitUserCourse, error } = useSubmitType();

  return (
    <>
      <div className="container-choose-type">
        <ErrorMessage isError={error}>
          Будь ласка, оберіть лише одного викладача.
        </ErrorMessage>
        <Types
          isChecked={checkedState}
          setIsChecked={handleCheckboxChangeState}
          menuState={menuState}
          listObject={getTypes}
        />
        <Button
          className="blue-button fixed-button"
          onClick={() => handleSubmitUserCourse(checkedState, subjectID, getTypes)}
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
