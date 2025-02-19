import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import Teachers from "./ui/teachers";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useShowPopup } from "../../../shared/model";
import { useObjState, useChangeObjState} from "../../../entities/checkbox-list/model";
import useSubmitTeacher from "./model/useSubmitTeacher";

import getTeachers from "../../../entities/checkbox-list/api/getTeachers";

export default function ChooseTeacher() {
  const { subjectID } = useParams();
  const menuState = useShowPopup();

  const { checkedState, setCheckedState } = useObjState(getTeachers);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const { handleSubmitUserTeacher, error } = useSubmitTeacher();

  return (
    <>
      <div className="container-choose-teacher">
        <ErrorMessage isError={error}>
          Будь ласка, оберіть лише одного викладача.
        </ErrorMessage>
        <Teachers
          isChecked={checkedState}
          setIsChecked={handleCheckboxChangeState}
          menuState={menuState}
          listObject={getTeachers}
          subjectID={subjectID}
        />
        <Button
          className="blue-button fixed-button"
          onClick={() =>
            handleSubmitUserTeacher(checkedState, subjectID, getTeachers)
          }
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
