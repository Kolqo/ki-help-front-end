import React from "react";
import AIIcon from "../assets/ai-icon";
import { Button } from "../../../shared/ui"
import "./styles.css";

export default function Task(props) {
  return (
    <>
      <div className="class-task">
        <div className="task-header">
          <div className="task-info">
            <p>{props.taskName}</p>
            <span>Вартість {props.taskPrice}грн</span>
          </div>
          <Button className="task-button-buy blue-button no-select">Придбати</Button>
        </div>
        <div className="task-footer">
            <p>Створено: @{props.taskCreator}</p>
            <AIIcon/>
        </div>
      </div>
    </>
  );
}