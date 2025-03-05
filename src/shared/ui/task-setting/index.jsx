import React from "react";
import "./styles.css";

import TwoArrowIcon from "../../assets/svg/two-arrow-icon";

export default function TaskSetting(props) {
  return (
    <>
      <div
        className={`class-task-setting no-select no-underline no-focus-and-active${
          props.className || ""
        }`}
        onClick={props.onClick}
      >
        <div className="setting-info">
          <p className="name">{props.settingName}</p>
          <p className="selected">
            {props.settingSelected === null
              ? "Не вибрано".length > 8
                ? `${"Не вибрано".slice(0, 6)}...`
                : "Не вибрано"
              : props.settingSelected.length > 8
                ? `${props.settingSelected.slice(0, 6)}...`
                : props.settingSelected}
          </p>
        </div>
        <div className="setting-icon">
          <TwoArrowIcon />
        </div>
      </div>
    </>
  );
}
