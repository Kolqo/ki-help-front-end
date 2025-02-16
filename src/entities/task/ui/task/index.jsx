import React from "react";
import "./styles.css";
import AIIcon from "../../assets/ai-icon";
import { Button } from "../../../../shared/ui";

export default function Task(props) {
  return (
    <div className="class-task"
      onContextMenu={props.menuState.handleContextMenu}
      onTouchStart={props.menuState.handleTouchStart}
      onTouchEnd={props.menuState.handleTouchEnd}
      onTouchMove={props.menuState.handleTouchMove}
    >
      <div className="task-header">
        <div className="task-info">
          <p>{props.task.title}</p>
          <span>Вартість {props.task.price}грн</span>
        </div>
        <Button
          className="task-button-buy blue-button no-select"
          onClick={props.onClick}
        >
          Придбати
        </Button>
      </div>
      <div className="task-footer">
        <p>Створено: @{props.task.developer.username}</p>
        {props.task.autoGenerate && <AIIcon />}
      </div>
    </div>
  );
}
