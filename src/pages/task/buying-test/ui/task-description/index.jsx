import React from "react";
import "./styles.css";

import useToggle from "../../../../../shared/model/useToggle";

export default function TaskDescription(props) {
  const { state, toggle } = useToggle();
  const isLongDescription = props.description.length < 90 ? "non-expand" : "";

  return (
    <>
      <div className="style-task-description ">
        <div className="task-description">
          <span>Інструкція від Kihelp</span>
          <p>
            {state ?  props.description : `${props.description.slice(0, 90)}...`}
          </p>
        </div>
        <div className={`task-expand ${isLongDescription}`}>
          <span onClick={toggle}>{state ? "згорнути" : "розгорнути"}</span>
        </div>
      </div>
    </>
  );
}
