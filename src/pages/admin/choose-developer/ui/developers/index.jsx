import React from "react";
import "./styles.css";

import { CheckBoxList } from "../../../../../entities/index.js";

export default function Developers(props) {
  return (
    <>
      <div className="style-developers">
        {props.listObject.map((arg) => (
          <CheckBoxList
            key={arg.id}
            className="developer"
            isChecked={props.isChecked[arg.id]}
            setIsChecked={() => props.setIsChecked(arg.id)}
          >
            {arg.name}
          </CheckBoxList>
        ))}
      </div>
    </>
  );
}
