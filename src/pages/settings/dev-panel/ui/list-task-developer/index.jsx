import React from "react";
import "./styles.css";

import { TaskDeveloper } from "../../../../../entities"
import getTaskDeveloper from "../../../../../entities/task-developer/api/getTaskDeveloper";

export default function ListTaskDeveloper() {
  return (
    <>
      <div className="style-list-task-developer">
        {getTaskDeveloper.map((item) => (
          <TaskDeveloper key={item.user.telegramId} taskDeveloper={item}/>
        ))}
      </div>
    </>
  );
}
