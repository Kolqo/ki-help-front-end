import React from "react";
import "./styles.css";

import { Button, TimeFormatter, Loading} from "../../../../shared/ui";

import { useDownload } from "../../../../shared/model";

export default function HistoryTask(props) {
  const {isLoading, handleDownload} = useDownload();

  return (
    <div className="class-history-task">
      <div className="task-header">
        <div className="task-info">
          <p>{props.task.taskTitle}</p>
          <span>{props.task.subjectName}</span>
        </div>
        <Button
          className="task-button-buy blue-button no-select"
          onClick={() => handleDownload(props.task.link, props.task.fileName)} 
          disabled={isLoading}
          leftIcon={isLoading && <Loading className="buying-task-spinner" />}
        >
          {isLoading ? "Скачується" : "Скачати"}
        </Button>
      </div>
      <div className="task-footer">
        <p><TimeFormatter utcDateString={props.task.createdAt}/></p>
      </div>
    </div>
  );
}
