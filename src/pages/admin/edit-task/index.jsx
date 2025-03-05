import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import { Fields, OptionalMenu } from "./ui";

import useEditTask from "./model/useEditTask.js";
import { useGoBack } from "../../../shared/model";

import fieldsForEditTask from "./const/fieldsForEditTask.js";
import optionalMenuItems from "./const/optionalMenuItems.jsx";

export default function EditTask() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/${subjectID}`);
  const location = useLocation();
  const { task } = location.state || {};

  const [isVisible, setIsVisible] = useState(false);

  const [selectedSettings, setSelectedSettings] = useState({
    task: null,
    developer: null,
    values: null,
  });

  const {
    error,
    errorMessage,
    isLoading,
    values,
    handleFieldChange,
    handlePatch,
  } = useEditTask(fieldsForEditTask, selectedSettings.values);

  useEffect(() => {
    if (values) {
      sessionStorage.setItem("formValues", JSON.stringify(values));
    }
  }, [values]);

  if (task) {
    sessionStorage.setItem("selectedTask", JSON.stringify(task));
  }

  useEffect(() => {
    const storedCreator = sessionStorage.getItem("selectedCreator");
    if (storedCreator) {
      const creator = JSON.parse(storedCreator);
      setSelectedSettings((prev) => ({ ...prev, developer: creator }));
    }

    const storedTask = sessionStorage.getItem("selectedTask");
    if (storedTask) {
      const task = JSON.parse(storedTask);
      setSelectedSettings((prev) => ({ ...prev, task: task }));
    }
  }, []);

  useEffect(() => {
    setIsVisible(selectedSettings.task?.visible);
  }, [selectedSettings.task?.visible]);

  return (
    <>
      <div className="container-edit-task">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="content-edit-task">
          <AdminHeader className="text-header" name="Адмін панель">
            Редагуй або видаляй предмети, викладача або завдання
          </AdminHeader>
          <Fields
            onChange={handleFieldChange}
            fields={fieldsForEditTask}
            values={values}
          />
          <OptionalMenu
            optionalMenuItems={optionalMenuItems(
              subjectID,
              isVisible,
              setIsVisible
            )}
            task={task}
          />
          <p>
            Після підтвердження всі дані будуть перезаписані. Будьте уважні,
            перш ніж підтвердити зміни.
          </p>
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => handlePatch(subjectID, isVisible, selectedSettings)}
          leftIcon={isLoading && <Loading className="buying-task-spinner" />}
        >
          {isLoading ? "Виконується запит" : "Підтвердити"}
        </Button>
      </div>
    </>
  );
}
