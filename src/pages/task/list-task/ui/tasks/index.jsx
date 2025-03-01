import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Task } from "../../../../../entities";
import { AdderIcon } from "../../../../../shared/assets/svg";
import {
  Button,
  Tgs,
  AdminPopup,
  ErrorMessage,
} from "../../../../../shared/ui";
import { LoadingTask } from "../";

import { useFilter, useSelectedTasks } from "../../model";
import { useRoles } from "../../../../../shared/model";

import adminPopupItems from "../../../../../shared/const/adminPopupItems";

import SadSmile from "../../assets/tgs/sad-smile.tgs";

export default function Tasks(props) {
  const navigate = useNavigate();
  
  const { error, errorMessage, isLoading, selectedTasks } = useSelectedTasks(
    props.selectedFilters
  );
  const { isAdmin } = useRoles();

  const filteredTasks = useFilter(props.selectedFilters, selectedTasks);

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
      <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
      <AdminPopup
        adminPopup={adminPopupItems}
        showPopup={props.menuState.showMenu}
        popupPosition={props.menuState.menuPosition}
        topTo="/edit-task"
      />
      {isLoading ? (
        <LoadingTask />
      ) : isAnyTask ? (
        <div className="tasks">
          {filteredTasks.map((item) => (
            <Task
              key={item.id}
              task={item}
              onClick={(e) => handleBuyClick(item, e)}
              menuState={props.menuState}
            />
          ))}
        </div>
      ) : (
        <div className="empty-list">
          <Tgs src={SadSmile} isLoop isAutoplay></Tgs>
          <p>Немає завдань</p>
          <div>Виберіть викладача або перевірте пізніше</div>
        </div>
      )}
      {isAdmin() && (
        <div className="button-tasks-box">
          <Button
            className="gray-button button-tasks"
            leftIcon={<AdderIcon />}
            onClick={() => navigate(`/add-task/${props.subjectID}`, {
              state: { teacher: props.selectedFilters.teacher },
            })}
          >
            Добавити предмет
          </Button>
        </div>
      )}
    </div>
  );
}
