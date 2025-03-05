import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import { Fields, OptionalMenu } from "./ui";

import fieldsForAddTask from "./const/fieldsForAddTask.js";
import optionalMenuItems from "./const/optionalMenuItems.jsx";

import useAddTask from "./model/useAddTask.js";
import { useGoBack } from "../../../shared/model";

export default function EditTask() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/${subjectID}`);
  const location = useLocation();
  const { teacher } = location.state || {};

  const [isAutoGeneration, setIsAutoGeneration] = useState(false);

  const [selectedSettings, setSelectedSettings] = useState({
    developer: null,
    arguments: null,
    teacher: null,
    type: null,
    values: null,
  });
  console.log(selectedSettings);
  const {
    error,
    errorMessage,
    isLoading,
    values,
    handleFieldChange,
    handlePost,
  } = useAddTask(fieldsForAddTask, selectedSettings.values);

  useEffect(() => {
    if (values) {
      sessionStorage.setItem("formValues", JSON.stringify(values));
    }
  }, [values]);

  if (teacher) {
    sessionStorage.setItem("selectedTeacher", JSON.stringify(teacher));
  }

  useEffect(() => {
    if (values) {
      sessionStorage.setItem("selectedValues", JSON.stringify(values));
    }
  }, [values]);

  useEffect(() => {
    const storedCreator = sessionStorage.getItem("selectedCreator");
    if (storedCreator) {
      const creator = JSON.parse(storedCreator);
      setSelectedSettings((prev) => ({ ...prev, developer: creator }));
    }

    const storedArgs = sessionStorage.getItem("selectedArgs");
    if (storedArgs) {
      const args = JSON.parse(storedArgs);
      setSelectedSettings((prev) => ({ ...prev, arguments: args }));
    }

    const storedTeacher = sessionStorage.getItem("selectedTeacher");
    if (storedTeacher) {
      const teacherData = JSON.parse(storedTeacher);
      setSelectedSettings((prev) => ({ ...prev, teacher: teacherData }));
    }

    const storedType = sessionStorage.getItem("selectedType");
    if (storedType) {
      const type = JSON.parse(storedType);
      setSelectedSettings((prev) => ({ ...prev, type: type }));
    }
  }, []);

  return (
    <>
      <div className="container-add-task">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="content-add-task">
          <AdminHeader className="text-header" name="Адмін панель">
            Добавляй предмети, викладача, завдання та інше.
          </AdminHeader>
          <Fields
            onChange={handleFieldChange}
            fields={fieldsForAddTask}
            values={values}
          />
          <OptionalMenu
            subjectID={subjectID}
            optionalMenuItems={optionalMenuItems(
              subjectID,
              isAutoGeneration,
              setIsAutoGeneration
            )}
          />
          <p>
            Після підтвердження ви добавите завдання в Kihelp. Будьте уважні,
            перш ніж підтвердити.
          </p>
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() =>
            handlePost(isAutoGeneration, selectedSettings, subjectID)
          }
          leftIcon={isLoading && <Loading className="buying-task-spinner" />}
        >
          {isLoading ? "Виконується запит" : "Підтвердити"}
        </Button>
      </div>
    </>
  );
}
