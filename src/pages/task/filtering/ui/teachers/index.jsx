import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { CheckBoxList } from "../../../../../entities";
import {
  Adder,
  Button,
  ErrorMessage,
  AdminPopup,
} from "../../../../../shared/ui";
import { useTeachers } from "../../model/useTeachers";
import { useTeachersActions } from "../../model/useTeachersАctions.js";
import { useErrorMessage, useShowPopup } from "../../../../../shared/model";
import adminPopupItems from "../../../../../shared/const/adminPopupItems.jsx";
import getTeachers from "../../../../../entities/checkbox-list/api/getTeachers.js";

export default function Teachers(props) {
  const navigate = useNavigate();
  const menuState = useShowPopup();
  const { selectedTeachers, handleTeacherSelect, validateSelection } =
    useTeachers();

  const { handleDoneClick } = useTeachersActions();
  const { error, setError } = useErrorMessage();

  return (
    <div className="container-teachers">
      <AdminPopup
        adminPopup={adminPopupItems}
        showPopup={menuState.showMenu}
        popupPosition={menuState.menuPosition}
        topTo="/edit-teacher"
      />
      <ErrorMessage isError={error}>
        Будь ласка, оберіть лише одного викладача.
      </ErrorMessage>
      <div className="style-teachers">
        {getTeachers.map((teacher) => (
          <CheckBoxList
            key={teacher.id}
            className="teacher"
            isChecked={selectedTeachers[teacher.id] || false}
            setIsChecked={(checked) => handleTeacherSelect(teacher.id, checked)}
            menuState={menuState}
          >
            {teacher.name}
          </CheckBoxList>
        ))}
        <Adder className="teacher" onClick={() => navigate(`/add-teacher`)} isIcon>
          Добавити викладача
        </Adder>
      </div>

      <div className="no-underline teachers-button-box">
        <Button
          className="blue-button teachers-button"
          onClick={handleDoneClick(
            validateSelection,
            navigate,
            props.subjectID,
            setError
          )}
        >
          Готово
        </Button>
      </div>
    </div>
  );
}
