import React from "react";
import "./styles.css";

import { CheckBoxList } from "../../../../../entities/index.js";

export default function Developers(props) {
  const isCreators = props.listObject > 1;
  return (
    <>
      {isCreators && (
        <div className="style-creators">
          {props.listObject.map((arg) => (
            <CheckBoxList
              key={arg.telegramId}
              className="creator"
              isChecked={props.isChecked[arg.telegramId]}
              setIsChecked={() => props.setIsChecked(arg.telegramId)}
            >
              {arg.username}
            </CheckBoxList>
          ))}
        </div>
      )}
    </>
  );
}
