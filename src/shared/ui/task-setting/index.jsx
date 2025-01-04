import React from "react";
import "./styles.css";

export default function TaskSetting(props) {
  return (
    <>
      <button className={`class-task-setting no-select ${props.className || ""}`} onClick={props.onClick}>
        <div className="setting-info">
          <p>{props.settingName}</p>
          <p className="selected">{props.settingSelected}</p>
        </div>
        <div className="setting-icon">
          {props.icon}
        </div>
      </button>
    </>
  );
}