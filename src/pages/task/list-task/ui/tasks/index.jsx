import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import getTask from "../../../../../entities/task/api/getTask";
import { Task } from "../../../../../entities";
import { AdderIcon } from "../../../../../shared/assets/svg";
import { Button, Tgs } from "../../../../../shared/ui";
import SadSmile from "../../assets/tgs/sad-smile.tgs";

export default function Tasks(props) {
  const navigate = useNavigate();

  const filteredTasks = getTask.filter(
    (item) => item.teacher.subject.id === Number(props.subjectID)
  );

  const isAnyTask = filteredTasks.length > 0;

  const handleBuyClick = (task, e) => {
    e.preventDefault();
    const isRegular = task.type === "REGULAR" ? "buying-task" : "buying-test";
    navigate(`/list-task/${props.subjectID}/${isRegular}`, {
      state: { task: task },
    });
  };

  return (
    <div className={`style-tasks ${!isAnyTask && "style-flex"}`}>
      {isAnyTask ? (
        filteredTasks.map((item) => (
          <Task
            key={item.id}
            task={item}
            onClick={(e) => handleBuyClick(item, e)}
          />
        ))
      ) : (
        <div className="empty-list">
          <Tgs src={SadSmile} isLoop isAutoplay></Tgs>
          <p>Немає завдань</p>
          <div>Виберіть викладача або перевірте пізніше</div>
        </div>
      )}
      {true && (
        <div className="button-tasks-box">
          <Button className="gray-button button-tasks" leftIcon={<AdderIcon />}>
            Добавити предмет
          </Button>
        </div>
      )}
    </div>
  );
}
