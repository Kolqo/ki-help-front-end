import React from "react";
import "./styles.css";

import { Checkbox } from "../../../shared/ui";

export default function CheckboxList(props) {
  return (
    <>
      <div
        className={`class-checkbox-list ${props.className || ""}`}
        onContextMenu={props.menuState?.handleContextMenu}
        onTouchStart={props.menuState?.handleTouchStart}
        onTouchEnd={props.menuState?.handleTouchEnd}
        onTouchMove={props.menuState?.handleTouchMove}
      >
        <Checkbox
          isChecked={props.isChecked}
          setIsChecked={props.setIsChecked}
        ></Checkbox>
        <p>{props.children}</p>
      </div>
    </>
  );
}
