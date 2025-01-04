import React from "react";
import { Checkbox } from "../../../shared/ui"
import useToggle from "../../../shared/modal/useToggle";
import "./styles.css";

export default function CheckboxList(props) {
  const {state, toggle} = useToggle();

  return (
    <>
      <div className={`class-checkbox-list ${props.className || ""}`}>
        <Checkbox isChecked={state} setIsChecked={toggle}></Checkbox>
        <p>{props.children}</p>
      </div>
    </>
  );
}