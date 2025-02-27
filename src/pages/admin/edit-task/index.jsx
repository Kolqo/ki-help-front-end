import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import { Fields, OptionalMenu } from "./ui";

import fieldsForEditTask from "./const/fieldsForEditTask.js";

import useEditTask from "./model/useEditTask.js";
import { useGoBack } from "../../../shared/model";

export default function EditTask() {
  useGoBack(`/`);

  const { error, errorMessage, isLoading, handleFieldChange, handlePatch } =
    useEditTask(fieldsForEditTask);

  return (
    <>
      <div className="container-edit-task">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="content-edit-task">
          <AdminHeader className="text-header" name="Адмін панель">
            Редагуй або видаляй предмети, викладача або завдання
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForEditTask} />
          <OptionalMenu />
          <p>
            Після підтвердження всі дані будуть перезаписані. Будьте уважні,
            перш ніж підтвердити зміни.
          </p>
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={handleValidation}
          leftIcon={isLoading && <Loading className="buying-task-spinner" />}
        >
          {isLoading ? "Виконується запит" : "Підтвердити"}
        </Button>
      </div>
    </>
  );
}
