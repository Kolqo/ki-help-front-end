import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import { Fields, OptionalMenu } from "./ui";

import fieldsForAddTask from "./const/fieldsForAddTask.js";

import useAddTask from "./model/useAddTask.js";

export default function EditTask() {
  const { subjectID } = useParams();
  const location = useLocation();
  const { teacher } = location.state || {};

  const [selectedSettings, setSelectedSettings] = useState({
    developer: null,
    arguments: null
  });
  console.log("selectedSettings: ", selectedSettings);

  const { error, errorMessage, isLoading, handleFieldChange, handlePost } =
    useAddTask(fieldsForAddTask);

  useEffect(() => {
    const storedCreator = sessionStorage.getItem("selectedCreator");
    if (storedCreator) {
      const creator = JSON.parse(storedCreator);
      setSelectedSettings((prev) => ({ ...prev, developer: creator }));
    }
  }, []);


  return (
    <>
      <div className="container-add-task">
        <ErrorMessage isError={error}>
          {errorMessage}
        </ErrorMessage>
        <div className="content-add-task">
          <AdminHeader className="text-header" name="Адмін панель">
            Добавляй предмети, викладача, завдання та інше.
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForAddTask} />
          <OptionalMenu subjectID={subjectID}/>
          <p>
            Після підтвердження ви добавите завдання в Kihelp. Будьте уважні,
            перш ніж підтвердити.
          </p>
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => handlePost(teacher.id)}
          leftIcon={isLoading && <Loading className="buying-task-spinner" />}
        >
          {isLoading ? "Виконується запит" : "Підтвердити"}
        </Button>
      </div>
    </>
  );
}
