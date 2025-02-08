import React from "react";
import "./styles.css";

export default function MenuSetting(props) {
  return (
    <>
      <button className="style-menu-setting">
        {props.menuSetting.leftIcon}
        <div className="menu-setting-text">
          <div className="menu-setting-name">{props.menuSetting.name}</div>
          <div className="menu-setting-description">{props.menuSetting.description}</div>
        </div>
        {props.menuSetting.rightIcon}
      </button>
    </>
  );
}