import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { AdminPopup, Adder } from "../../../../../shared/ui/index.jsx";
import { CheckBoxList } from "../../../../../entities/index.js";

import adminPopupItems from "../../../../../shared/const/adminPopupItems.jsx";

export default function Arguments(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="style-teachers">
        <AdminPopup
          adminPopup={adminPopupItems}
          showPopup={props.menuState.showMenu}
          popupPosition={props.menuState.menuPosition}
          topTo={`/list-task/${props.subjectID}/filtering/choose-teacher/edit-teacher`}
        />
        {props.listObject.map((arg) => (
          <CheckBoxList
            key={arg.id}
            className="teacher"
            isChecked={props.isChecked[arg.id]}
            setIsChecked={() => props.setIsChecked(arg.id)}
            menuState={props.menuState}
          >
            {arg.name}
          </CheckBoxList>
        ))}
        <Adder className="teacher" onClick={() => navigate(`/list-task/${props.subjectID}/filtering/choose-teacher/add-teacher`)} isIcon>Добавити аргумент</Adder>
      </div>
    </>
  );
}
