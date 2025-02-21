import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Task } from "../../../../../entities";
import { AdderIcon } from "../../../../../shared/assets/svg";
import { Button, Tgs, AdminPopup } from "../../../../../shared/ui";

import useSelectTasks from "../../model/useSelectTasks.js"

import adminPopupItems from "../../../../../shared/const/adminPopupItems";

import SadSmile from "../../assets/tgs/sad-smile.tgs";

export default function Tasks(props) {
  const navigate = useNavigate();

  const selectedTasks = useSelectTasks();

  const isAnyTask = selectedTasks.length > 0;

  const handleBuyClick = (task, e) => {
    e.preventDefault();
    const isRegular = task.type === "REGULAR" ? "buying-task" : "buying-test";
    navigate(`/list-task/${props.subjectID}/${isRegular}`, {
      state: { task: task },
    });
  };

  return (
    <div className={`style-tasks ${!isAnyTask && "style-flex"}`}>
      <AdminPopup
        adminPopup={adminPopupItems}
        showPopup={props.menuState.showMenu}
        popupPosition={props.menuState.menuPosition}
        topTo="/edit-task"
      />
      {isAnyTask ? (
        selectedTasks.map((item) => (
          <Task
            key={item.id}
            task={item}
            onClick={(e) => handleBuyClick(item, e)}
            menuState={props.menuState}
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
          <Button
            className="gray-button button-tasks"
            leftIcon={<AdderIcon />}
            onClick={() => navigate(`/add-task`)}
          >
            Добавити предмет
          </Button>
        </div>
      )}
    </div>
  );
}
