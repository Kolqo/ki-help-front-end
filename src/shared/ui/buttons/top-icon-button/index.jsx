import React from "react";
import "./styles.css";

export default function TopIconButton(props) {
  return (
    <>
      <button
        className={`class-top-icon-button no-select ${props.className || ""}`}
        style={props.style}
        onClick={props.onClick}
        onContextMenu={props.menuState?.handleContextMenu}
        onTouchStart={props.menuState?.handleTouchStart}
        onTouchEnd={props.menuState?.handleTouchEnd}
        onTouchMove={props.menuState?.handleTouchMove}
      >
        <div className="left-icon">{props.leftIcon}</div>
        {props.children}
      </button>
    </>
  );
}
