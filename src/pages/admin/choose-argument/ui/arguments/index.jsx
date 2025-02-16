import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { AdminPopup, Adder } from "../../../../../shared/ui";
import { CheckBoxList } from "../../../../../entities";

import adminPopupItems from "../../../../../shared/const/adminPopupItems.jsx";

export default function Arguments(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="style-arguments">
        <AdminPopup
          adminPopup={adminPopupItems}
          showPopup={props.menuState.showMenu}
          popupPosition={props.menuState.menuPosition}
          // topTo="/"
        />
        {props.listObject.map((arg) => (
          <CheckBoxList
            key={arg.id}
            className="argument"
            isChecked={props.isChecked[arg.id]}
            setIsChecked={() => props.setIsChecked(arg.id)}
            menuState={props.menuState}
          >
            {arg.name}
          </CheckBoxList>
        ))}
        <Adder className="argument" onClick={() => navigate(`/add-task/choose-argument/add-argument`)} isIcon>Добавити розробника</Adder>
      </div>
    </>
  );
}
