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

import { useDeleteTask, useFilter, useSelectedTasks } from "../../model";
import { useRoles } from "../../../../../shared/model";

import adminPopupItems from "../../../../../shared/const/adminPopupItems";

import SadSmile from "../../assets/tgs/sad-smile.tgs";

export default function Tasks(props) {
  const navigate = useNavigate();

  const { error, errorMessage, isLoading, selectedTasks, refetch } =
    useSelectedTasks(props.selectedFilters);
  const { isAdmin } = useRoles();
  const { errorDelete, errorDeleteMessage, isLoadingMessage, handleDelete } =
    useDeleteTask();
  const filteredTasks = useFilter(props.selectedFilters, selectedTasks);

  const isAnyTask = filteredTasks.length > 0;

  const deleteTask = async (taskId) => {
    try {
      await handleDelete(taskId);
      refetch();
    } catch {}
  };

  return (
    <div className={`style-tasks ${!isAnyTask && "style-flex"}`}>
      <ErrorMessage isError={error || errorDelete}>
        {error ? errorMessage : errorDeleteMessage}
      </ErrorMessage>
      {isLoading ? (
        <LoadingTask />
      ) : isAnyTask ? (
        <div className="tasks">
          {filteredTasks.map((item) => (
            <div>
              {props.menuState.selectedId === item.id && (
                <AdminPopup
                  adminPopup={adminPopupItems}
                  showPopup={props.menuState.showMenu}
                  popupPosition={props.menuState.menuPosition}
                  onClickTop={() =>
                    navigate(`/list-task/edit-task/${props.subjectID}`, {
                      state: { task: item },
                    })
                  }
                  onClickBottom={() => deleteTask(item.id)}
                />
              )}

              <Task
                key={item.id}
                task={item}
                onClick={() =>
                  navigate(
                    `/list-task/${props.subjectID}/${
                      item.type === "REGULAR" ? "buying-task" : "buying-test"
                    }`,
                    {
                      state: { task: item },
                    }
                  )
                }
                menuState={props.menuState}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-list">
          <Tgs src={SadSmile} isLoop isAutoplay></Tgs>
          <p>Немає завдань</p>
          <div>Виберіть викладача або перевірте пізніше</div>
        </div>
      )}
      {isAdmin() && props.selectedFilters.teacher && (
        <div className="button-tasks-box">
          <Button
            className="gray-button button-tasks"
            leftIcon={<AdderIcon />}
            onClick={() =>
              navigate(`/list-task/add-task/${props.subjectID}`, {
                state: { teacher: props.selectedFilters.teacher },
              })
            }
          >
            Добавити предмет
          </Button>
        </div>
      )}
    </div>
  );
}
