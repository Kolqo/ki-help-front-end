import React from "react";
import "./styles.css";

import { CheckBoxList } from "../../../../../entities/index.js";

export default function Developers(props) {
  return (
    <>
      <div className="style-developers">
        {props.listObject.map((arg) => (
          <CheckBoxList
            key={arg.telegramId}
            className="developer"
            isChecked={props.isChecked[arg.telegramId]}
            setIsChecked={() => props.setIsChecked(arg.telegramId)}
          >
            {arg.username}
          </CheckBoxList>
        ))}
      </div>
    </>
  );
}
