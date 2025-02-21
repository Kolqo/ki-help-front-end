import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function MenuSetting(props) {
  const navigate = useNavigate();
  return (
    <>
      <button className="style-menu-setting" onClick={() => (navigate(props.menuSetting.to))}>
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