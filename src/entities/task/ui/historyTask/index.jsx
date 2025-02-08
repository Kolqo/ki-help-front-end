import React from "react";
import "./styles.css";

import { Button, TimeFormatter } from "../../../../shared/ui";

export default function HistoryTask(props) {
  return (
    <div className="class-history-task">
      <div className="task-header">
        <div className="task-info">
          <p>{props.task.taskTitle}</p>
          <span>{props.task.subjectName}</span>
        </div>
        <Button
          className="task-button-buy blue-button no-select"
          onClick={props.onClick} 
        >
          Скачати
        </Button>
      </div>
      <div className="task-footer">
        <p><TimeFormatter utcDateString={props.task.createdAt}/></p>
      </div>
    </div>
  );
}
