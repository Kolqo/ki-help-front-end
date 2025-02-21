import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import Teachers from "./ui/teachers";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useShowPopup, useGoBack} from "../../../shared/model";
import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model";
import { useSelectTeachers, useSubmitTeacher} from "./model";


export default function ChooseTeacher() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/${subjectID}`);

  const menuState = useShowPopup();

  const selectedTeachers = useSelectTeachers(subjectID)
  const { checkedState, setCheckedState } = useObjState(selectedTeachers);
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
          listObject={selectedTeachers}
          subjectID={subjectID}
        />
        <Button
          className="blue-button fixed-button"
          onClick={() =>
            handleSubmitUserTeacher(
              checkedState,
              subjectID,
              selectedTeachers
            )
          }
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
