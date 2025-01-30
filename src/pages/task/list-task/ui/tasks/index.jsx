import React, { useEffect } from "react";
import "./styles.css";

import getTask from "../../../../../entities/task/api/getTask";
import filterItems from "../../const/filterItems";
import { Task } from "../../../../../entities";
import { GrayAdderIcon } from "../../../../../shared/assets/svg";
import { Button } from "../../../../../shared/ui";

export default function Tasks(props) {
  const filteredTasks = getTask.filter(
    (item) => item.teacher.subject.id === Number(props.subjectID)
  );

  // useEffect(() => {
    
  // }, [])

  return (
    <div className="style-tasks">
      {filteredTasks.map((item) => (
        <Task
          key={item.id}
          task={item}
          subjectID={props.subjectID}
        />
      ))}
      {true && (
        <Button
          className="gray-button button-tasks"
          leftIcon={<GrayAdderIcon />}
        >
          Добавити предмет
        </Button>
      )}
    </div>
  );
}
