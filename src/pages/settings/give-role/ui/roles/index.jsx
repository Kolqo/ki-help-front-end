import React from "react";
import "./styles.css";

import { CheckBoxList } from "../../../../../entities/index.js";

export default function Types(props) {
  return (
    <>
      <div className="style-roles">
        {props.listObject.map((type) => (
          <CheckBoxList
            key={type.id}
            className="role"
            isChecked={props.isChecked[type.id]}
            setIsChecked={() => props.setIsChecked(type.id)}
            menuState={props.menuState}
          >
            {type.name}
          </CheckBoxList>
        ))}
      </div>
    </>
  );
}
