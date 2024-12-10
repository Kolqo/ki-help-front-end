import React from "react";
import "./styles.css";

export default function MenuSetting(props) {
  return (
    <>
      <button className="style-menu-setting">
        {props.leftIcon}
        <div className="menu-setting-text">
          <div className="menu-setting-name">{props.name}</div>
          <div className="menu-setting-description">{props.children}</div>
        </div>
        {props.rightIcon}
      </button>
    </>
  );
}