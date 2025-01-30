import React from "react";
import "./styles.css";

import { Checkbox } from "../../../shared/ui"

export default function CheckboxList(props) {
  return (
    <>
      <div className={`class-checkbox-list ${props.className || ""}`}>
        <Checkbox isChecked={props.isChecked} setIsChecked={props.setIsChecked}></Checkbox>
        <p>{props.children}</p>
      </div>
    </>
  );
}